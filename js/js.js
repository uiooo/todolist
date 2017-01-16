var Todo=(function () {
	var data={},
		codes={
			'1':'.taskList',
			'2':'.doing',
			'3':'.completed'
		};
	function MyTodoList () {
		var _this=this;
		_this.data=JSON.parse(localStorage.getItem('todolist'))||{};
		for(var prop in _this.data){
			if (prop) {
//				console.log('test');
				_this.createElement({
					id:prop,
					title:_this.data[prop].title,
					datep:_this.data[prop].datep,
					content:_this.data[prop].content,
					codes:_this.data[prop].codes
				})
			}
		}
		$('#datepicker').datepicker();
		$('input[type=submit]').click(function(){
			var title=$('#title').val(),
				datep=$('#datepicker').val(),
				id=Date.now()+'',
				content=$('#content').val();
			_this.createElement({
				title:title,
				datep:datep,
				id:id,
				codes:1,
				content:content
			});
			$('#title').val(''),
			$('#datepicker').val(''),
			$('#content').val('');
			_this.data[id]={
				title:title,
				datep:datep,
				id:id,
				content:content,
				codes:1
			}
			_this.serData();
		});
		$.each(codes, function(index,value) {
			$(value).droppable({
                drop: function(event, ui) {
                    var element = ui.helper,
                        id = element.attr('id'),
                        item=_this.data[id];
					item.codes=index;
                    _this.deleteElement({
                        id: id
                    });
                    _this.createElement({
			        	title:item.title,
						datep:item.datep,
						id:item.id,
						content:item.content,
						codes:item.codes
		       		})
                    _this.serData();
				}
			})
		});
		$('.del').droppable({
			drop:function(event,ui){
				var element=ui.helper,
					id=element.attr('id');
					
				_this.deleteElement({
		            id: id
		        });
		        delete _this.data[id];
		        _this.serData();
			}
		});
	}
	
	MyTodoList.prototype.createElement=function (params) {
		var parent=$(codes[params.codes]),
		    container;
		container=$('<div/>',{
			class:'msg',
			id:params.id
		});
		$('<h2/>',{
			text:params.title
		}).appendTo(container);
		$('<div/>',{
			class:'date',
			text:params.datep
		}).appendTo(container);
		$('<div/>',{
			class:'content',
			text:params.content
		}).appendTo(container);
		container.appendTo(parent);
		container.draggable({
			opacity:0.5,
			start:function () {
				$('.del').show("fast");
			},
			stop:function () {
				$('.del').hide("fast");
			}
		})
	};
	MyTodoList.prototype.deleteElement=function (params) {
		$('#'+params.id).remove();
	};
	MyTodoList.prototype.serData=function () {
		localStorage.setItem('todolist',JSON.stringify(this.data))
	};
	return MyTodoList;
})();



















