window.onload = function(){
    setTimeout(setgradient,50);
    setTimeout(setTime,1000);
}

segment1=[1,0,1,1,0,1,1,1,1,1];
segment2=[1,0,0,0,1,1,1,0,1,1];
segment3=[1,1,1,1,1,0,0,1,1,1];
segment4=[0,0,1,1,1,1,1,0,1,1];
segment5=[1,0,1,0,0,0,1,0,1,0];
segment6=[1,1,0,1,1,1,1,1,1,1];
segment7=[1,0,1,1,0,1,1,0,1,1];
segments=[segment1,segment2,segment3,segment4,segment5,segment6,segment7];
let gradient = 0;
let gray="#808080"
let green="#008000"
let from=gray
let to=green

function setTime(){
    d= new Date();
    setSegment("hourt",Math.floor(d.getHours()/10) ,(Math.floor(d.getHours()/10)+1)%3,(d.getHours()%10)*10+d.getMinutes()/60)
    setSegment("hours",d.getHours()%10,(d.getHours()+1)%10,d.getMinutes()*100/60)
    setSegment("minutest",Math.floor(d.getMinutes()/10),(Math.floor(d.getMinutes()/10)+1)%7,(d.getMinutes()%10)*10+d.getSeconds()/60)
    setSegment("minutess",d.getMinutes()%10 ,(d.getMinutes()+1)%10,d.getSeconds()*100/60)
    setTimeout(setTime,1000);
}

function getSegment(parent, child){
    return document.querySelectorAll("#"+parent+" #"+child)[0];
}

function setSegment(parent, cur, next, percent){
    console.log(parent+" "+cur+" "+next+" "+percent)
    segs=["segment1","segment2","segment3","segment4","segment5","segment6","segment7"]
    for (segment in segs){
        if (segments[segment][cur]!=segments[segment][next]){
            if(segments[segment][cur]<segments[segment][next]){
                getSegment(parent,segs[segment]).style.backgroundColor=getGradientColor(gray,green,percent);
            } else {
                getSegment(parent,segs[segment]).style.backgroundColor=getGradientColor(green,gray,percent);
            }
        } else {
            getSegment(parent,segs[segment]).style.backgroundColor=segments[segment][cur]==0?gray:green;
        }
    }
}

function setgradient(){
    grad = getGradientColor(from, to, gradient);
    document.getElementById("toppoint").style.backgroundColor = grad
    document.getElementById("botpoint").style.backgroundColor = grad
    if(gradient==100){
        gradient=0;
        t=from;
        from=to;
        to=t;
    } else {
      gradient+=5;
    }
    setTimeout(setgradient,50);
}

getGradientColor = function(start_color, end_color, percent) {
    // strip the leading # if it's there
    start_color = start_color.replace(/^\s*#|\s*$/g, '');
    end_color = end_color.replace(/^\s*#|\s*$/g, '');
 
    // get colors
    var start_red = parseInt(start_color.substr(0, 2), 16),
        start_green = parseInt(start_color.substr(2, 2), 16),
        start_blue = parseInt(start_color.substr(4, 2), 16);
 
    var end_red = parseInt(end_color.substr(0, 2), 16),
        end_green = parseInt(end_color.substr(2, 2), 16),
        end_blue = parseInt(end_color.substr(4, 2), 16);
 
    // calculate new color
    var diff_red = end_red - start_red;
    var diff_green = end_green - start_green;
    var diff_blue = end_blue - start_blue;

 
    diff_red = ( (diff_red * percent/100) + start_red ).toString(16).split('.')[0];
    diff_green = ( (diff_green * percent/100) + start_green ).toString(16).split('.')[0];
    diff_blue = ( (diff_blue * percent/100) + start_blue ).toString(16).split('.')[0];
 
    // ensure 2 digits by color
    if( diff_red.length == 1 ) diff_red = '0' + diff_red
    if( diff_green.length == 1 ) diff_green = '0' + diff_green
    if( diff_blue.length == 1 ) diff_blue = '0' + diff_blue
 
    return '#' + diff_red + diff_green + diff_blue;
  };