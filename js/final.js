// JavaScript Document

//for the video sliding
var imageBrowser = document.getElementById("imageBrowser");
var iframe = document.getElementById("player");
var videosUl = document.getElementsByClassName("video-source")[0];
var videos = videosUl.getElementsByTagName("img");
var thnms = document.getElementById("thumbnails");
var lftSlide = document.getElementById("leftSlide");
var rtSlide = document.getElementById("rightSlide");
var indicatorDiv = document.getElementsByClassName("indicator")[0];
var indicators = indicatorDiv.getElementsByTagName("img");


indicators[0].src = "image/active-indicator.png";//for the initial indicator
for(var i = 0; i<videos.length;i++)
{
	videos[i].setAttribute("sno",i);
	videos[i].onclick = function()
	{
		for(var j = 0;j<indicators.length;j++)
		{
			indicators[j].src = "image/inactive-indicator.png";
		}
		var indicatorIndex = parseInt(this.getAttribute("sno"));
		indicators[indicatorIndex].src = "image/active-indicator.png";
		if(this.alt != "picture")
		{
			imageBrowser.style.display = "none";
			iframe.src = this.alt;
			iframe.style.display = "block";
		}
		else
		{
			iframe.style.display = "none";
			imageBrowser.src = this.src;
			imageBrowser.style.display = "block";
		}
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
		
		for(var i=0;i<videos.length;i++)
		{
			var sn = parseInt(videos[i].getAttribute("sno"))-1;
			videos[i].setAttribute("sno",sn);
		}
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
		for(var i=0;i<videos.length;i++)
		{
			var sn = parseInt(videos[i].getAttribute("sno"))+1;
			videos[i].setAttribute("sno",sn);
		}
	}
}

var slideLeftInterval;
var marginCount=0;
var slideRightInterval;
lftSlide.onclick = function()
{
	if(videos[videos.length-1].getAttribute("sno") != 3)
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
	if(videos[0].getAttribute("sno") !=0)
	{
		if(marginCount == 0)
		{
			marginCount = 158;
			slideRightInterval = setInterval(slideRight,1);
		}
	}
}