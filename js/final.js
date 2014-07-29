// JavaScript Document

//for the video sliding

var iframe = document.getElementById("player");
var videosUl = document.getElementsByClassName("video-source")[0];
var videos = videosUl.getElementsByTagName("img");
var thnms = document.getElementById("thumbnails");
var lftSlide = document.getElementById("leftSlide");
var rtSlide = document.getElementById("rightSlide");

for(var i = 0; i<videos.length;i++)
{
	videos[i].onclick = function()
	{
		iframe.src = this.alt;
	} 
}

var marginLeft = -11;
function slideLeft()
{
	if(marginCount != 0)
	{
		videosUl.style.marginLeft = (--marginLeft)+"px";
		marginCount--;
	}
	else
	{
		clearInterval(slideLeftInterval);
		videos[videoSlideIndex].setAttribute("sno",0);
		videos[++videoSlideIndex].setAttribute("sno",1);
	}
}

function slideRight()
{
	if(marginCount != 0)
	{
		videosUl.style.marginLeft = (++marginLeft)+"px";
		marginCount--;
	}
	else
	{
		clearInterval(slideRightInterval);
		videos[videoSlideIndex].setAttribute("sno",0);
		videos[--videoSlideIndex].setAttribute("sno",1);
	}
}

var slideLeftInterval;
var marginCount=0;
var slideRightInterval;
var videoSlideIndex = 0;
videos[videoSlideIndex].setAttribute("sno",1);
lftSlide.onclick = function()
{
	if(videos[videos.length-4].getAttribute("sno") !=1)
	{
		if(marginCount == 0)
		{
			marginCount = 158;
			slideLeftInterval = setInterval(slideLeft,1);
		}
	}
}

rtSlide.onclick = function()
{
	if(videos[0].getAttribute("sno") !=1)
	{
		if(marginCount == 0)
		{
			marginCount = 158;
			slideRightInterval = setInterval(slideRight,1);
		}
	}
}