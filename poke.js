$(function(){
    let color=['c','d','s','h'];
    let poke=[];
    let flag={};
    let btnR=$('div.btnR');
    /*for(let i=0;i<52;i++){
        let hua=color[Math.floor(Math.random()*color.length)];
        let num=Math.floor(Math.random()*13+1);
        while (flag[`${hua}_${num}`]){
             hua=color[Math.floor(Math.random()*color.length)];
             num=Math.floor(Math.random()*13+1);
        }
        poke.push({hua,num});
        flag[`${hua}_${num}`]=true;
    }*/

    while (poke.length<52){
        let hua=color[Math.floor(Math.random()*color.length)];
        let num=Math.floor(Math.random()*13+1);
        if(!flag[`${hua}_${num}`]){
            poke.push({hua,num});
            flag[`${hua}_${num}`]=true;
        }
    }
    let index=0;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            let left=300-50*i+110*j,
                top=50*i;
            $('<div>').addClass('box')
                .attr('id',`${i}_${j}`)
                .data('num',poke[index].num)
                .css('background-image',`url(img/${poke[index].num}${poke[index].hua}.jpg)`)
                .appendTo('.zhuozi')
                .delay(index*10).animate({left,top,opacity:1});
                index++;
        }
    }
    for(;index<poke.length;index++){
        $('<div>').addClass('box zuo')
            .attr('id',`${-2}_${-2}`)
            .data('num',poke[index].num)
            .css('background-image',`url(img/${poke[index].num}${poke[index].hua}.jpg)`)
            .appendTo('.zhuozi')
            .delay(index*10).animate({left:0,top:460,opacity:1});
    }
    let first=null;
    $('.zhuozi').on('click','.box',function (e) {
        let element=$(e.target);
        let ids=element.attr('id').split('_');
        let ele1=`#${ids[0]*1+1}_${ids[1]*1}`,
            ele2=`#${ids[0]*1+1}_${ids[1]*1+1}`;
        if($(ele1).length||$(ele2).length){
            return;
        }
        element.toggleClass('active');
        if(element.hasClass('active')){
            element.animate({top:'-=20'});
        }else{
            element.animate({top:'+=20'});
        }
        if(!first){
            first=$(e.target);
        }else{
            if((first.data('num')+element.data('num')==14)){
                $('.active').animate({left:600,top:0,opacity:0},function () {
                     $(this).remove();
                })
            }else{
                $('.active').animate({top:'+=20'},function () {
                    $(this).removeClass('active');
                });
                first=null;
            }
        }
    });
    let zindex=0;
    $('.btnR').on('click',function () {
        $('.zuo').eq(-1).css('zIndex',zindex++).animate({left:600})
            .removeClass('zuo').addClass('you');
    })
    $('.btnL').on('click',function () {
        if(!$('.you').length){return}
        /*$('.you').css('zIndex',zindex++).delay(zindex*10).animate({left:600})
            .removeClass('you').addClass('zuo');*/
        $('.you').each(function (index) {
            $(this).css('zIndex',zindex++).delay(index*100)
                .animate({left:0}).removeClass('you').addClass('zuo');
        })
    })
});