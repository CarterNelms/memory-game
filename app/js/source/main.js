(function(){
	'use strict';

	$(document).ready(initialize);

	var clockTime;
	var timer;
	var pictures;

	function initialize()
	{
		initializePictures();
		$('#start').click(start);
		$('#animate').click(animate);
	}

	function start()
	{
		clockTime = 3;
		$('#clock').text(clockTime);
		timer = setInterval(updateClock, 1000);
		$('.flipper').removeClass('faceUp');
		shuffle();
		$('#gameGrid tbody').on('click', '.back', animate);
	}

	function initializePictures()
	{
		var pictureDir = 'media/images/panels/';
		var pictureNames = ['gus.png',
												'hank.png',
												'heisenberg.png',
												'jesse.png',
												'marie.png',
												'mike.png',
												'saul.png',
												'skyler.png',
												'walt.png',
												'walt-jr.png'
		];
		pictures = [];
		for(var i = 0; i < pictureNames.length; ++i)
		{
			pictures.push(pictureDir + pictureNames[i]);
		}
		pictures = pictures.concat(pictures);
	}

	function shuffle()
	{
		var orderedPics = [].concat(pictures);
		//var randomizedPics = [];

		for(var i = orderedPics.length; i > 0; --i)
		{
			var index = Math.floor((Math.random() * i));
			$('#panel'+(i-1)+' .front').attr('src', orderedPics[index]);
			//randomizedPics.push(orderedPics[index]);
			orderedPics.splice(index, 1);
		}
		debugger;
	}

	function updateClock()
	{
		--clockTime;
		$('#clock').text(clockTime);	
		if(clockTime <= 0)
		{
			clearInterval(timer);
		}
	}

	function animate()
	{
		$('.flipper').toggleClass('faceUp');
	}

})();