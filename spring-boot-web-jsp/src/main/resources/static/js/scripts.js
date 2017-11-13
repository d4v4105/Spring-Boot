$(document).ready(function(){ 
//window resize===========================================    
    var h_cont=780;
	var h, new_h;
	setHeight();
	h=new_h;
	setSize();
	function setHeight(){
		new_h=$(window).height();
	}
	function setSize(){
		if (h>h_cont) {
			$('.main').stop().animate({paddingTop:~~((h-h_cont)/2)});	
		} else {
			$('.main').stop().animate({paddingTop:0});	
		}
	}
	setInterval(setNew,1);
	function setNew(){
		setHeight();
		if (h!=new_h) {
			h=new_h;
			setSize();
		}
	}
//page1 pic zoom===========================================  
    $('.zoomImg').fadeTo(500, 0)
    
    $('.zoomImg').hover(function(){
    $(this).stop().fadeTo(500, 0.5)
    }, function(){
            $(this).stop().fadeTo(500, 0)
    })
    $('.zoomImg2').fadeTo(500, 0)
    
    $('.zoomImg2').hover(function(){
    $(this).stop().fadeTo(500, 0.5)
    }, function(){
            $(this).stop().fadeTo(500, 0)
    })
});
$(window).load(function(){
//for Browsers ----------------------------------------------------------------------------------------------------     
        if($.browser.msie && $.browser.version==9){
            $(".links li").css({'padding-bottom':'15px'});
            $(".links").css({'margin-bottom':'52px'});	
            $(".col1 .color1").css({'line-height':'16px'});
            $(".col1 .margBot3").css({'margin-bottom':'45px'});
            $(".col1 .margBot4").css({'margin-bottom':'48px'});
            $(".col2 .color1").css({'line-height':'16px'});
            $(".col3 .color1").css({'line-height':'16px'});
            $(".col6 .color1").css({'line-height':'16px'});
            $(".margBot1").css({'margin-bottom':'7px'});
            $(".col2 figcaption").css({'top':'0px'});
            $(".contactText_2").css({'margin-bottom':'3px'});
        }
//Hover a ---------------------------------------------------------------------------------------------------- 
    $('.col1 a').hover(function(){
        $(this).stop().animate({color:'#516675'}, 400, "easeOutSine")						 
            }, function(){
        $(this).stop().animate({color:'#fff'}, 300, "easeOutSine")						 
    })
    $('.col3 a').hover(function(){
        $(this).stop().animate({color:'#516675'}, 400, "easeOutSine")						 
            }, function(){
        $(this).stop().animate({color:'#fff'}, 300, "easeOutSine")						 
    })
    $('.col5 a').hover(function(){
        $(this).stop().animate({color:'#516675'}, 400, "easeOutSine")						 
            }, function(){
        $(this).stop().animate({color:'#fff'}, 300, "easeOutSine")						 
    })
    $('.col6 a').hover(function(){
        $(this).stop().animate({color:'#537791'}, 400, "easeOutSine")						 
            }, function(){
        $(this).stop().animate({color:'#fff'}, 300, "easeOutSine")						 
    })
    $('#page_works a').hover(function(){
        $(this).stop().animate({color:'#516675'}, 400, "easeOutSine")						 
            }, function(){
        $(this).stop().animate({color:'#fff'}, 300, "easeOutSine")						 
    })
    $('.privacy a').hover(function(){
        $(this).stop().animate({color:'#fff'}, 400, "easeOutSine")						 
            }, function(){
        $(this).stop().animate({color:'#385061'}, 300, "easeOutSine")						 
    })
    $('.contact-info  a').hover(function(){
        $(this).stop().animate({color:'#537791'}, 400, "easeOutSine")						 
            }, function(){
        $(this).stop().animate({color:'#fff'}, 300, "easeOutSine")						 
    })   
//bgStretch -------------------------------------------------------------------------------------------------- 
	$('#bgStretch')
		.bgStretch({
			align:'leftTop',
			navigs:$('.bgNav').navigs()
		}).sImg({
			spinner:$('.gall_spinner').hide()
		})    
//Content switch----------------------------------------------------------------------------------------------   
     $('ul#menu').superfish({
          delay:       800,
          animation:   {height:'show'},
          speed:       600,
          autoArrows:  false,
          dropShadows: false,
        });    
        
	var content=$('#content'),
		nav=$('.menu');
    var firstSpl=true;

    	$('#content').tabs({
		preFu:function(_){
			_.li.css({left:"-1700px",'display':'none'});
            $(".headerHolder").stop(true).animate({left:'400px'},900 ,'easeInOutCubic');
		}
		,actFu:function(_){			
			if(_.curr){
				_.curr.css({'display':'block', left:'-1700px'}).stop().delay(400).animate({left:"275px"},600,'easeOutCubic').animate({left:"260px"},350,'easeOutCubic');
            }
        
			if(_.prev){
			     _.prev.stop().animate({left:"1700px"},800,'easeInBack',function(){_.prev.css({'display':'none'});}  );
             }
			if(_.n < 0){ 
			     $(".headerHolder").stop(true).delay(50).animate({left:'400px'},900 ,'easeInOutCubic');
            } 
            if(_.n > 0){ 
			     $(".headerHolder").stop(true).animate({left:'400px'},900 ,'easeInOutCubic');
            }
		}
	})
//Main menu---------------------------------------------------------------------------------------------------    
	nav.navs({
			useHash:true,
            defHash:'#!/',
             hoverIn:function(li){
                $(".overPlane", li).stop(true).animate({opacity:1},500,'easeOutExpo');
             },
                hoverOut:function(li){
                    if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                        $(".overPlane", li).stop(true).animate({opacity:0},500,'easeOutExpo');  
                       
                    } 
                } 
		})
		.navs(function(n){			
			$('#content').tabs(n);
		})      
    } 
)