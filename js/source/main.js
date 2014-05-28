(function(){
	'use strict';

	$(document).ready(initialize);

	var gameTimeAtStart = 60;

	var clockTime;
	var timer;
	var pictures;
	var matchesLeft;
	var chosenCards = [];
	var $startButton;
	var $clock;
	var $gameGrid;
	var audio = new Audio('media/sounds/music/Breaking Bad Full Intro.mp3');
	//var quote = new Audio('media/sounds/magnets.mp3');
	//var videoDiv = $('#videoDiv');
	var isGameInSession;

	function initialize()
	{
		initializePictures();
		$startButton = $('#start');
		$clock = $('#clock');
		$gameGrid = $('#gameGrid tbody');
		$startButton.click(start);
		//$('#animate').click(animate);
	}

	function start()
	{
		isGameInSession = true;
		queueSounds([audio]);//queueSounds([quote, audio]);
		//audio.play();
		// var vid = $('<iframe>');
		// vid.attr()
		// videoDiv.append('')
		// Stop listening for start
		$startButton.off('click');
		// Reset clock
		setClock(gameTimeAtStart);
		// Shuffle for a new game
		shuffle();

		/* The player must find every match to win.
		Number of matches = 1/2 number of pictures
		*/
		matchesLeft = pictures.length/2;

		// Begin the countdown
		timer = setInterval(updateClock, 1000);
		// Listen for clicks on the cards
		prepForNextMove();
	}

	function makeMove()
	{
		$(this).addClass('faceUp');
		var matchedCardCount = pictures.length - 2*matchesLeft;
		var cardsUpAll = $('.flipper.faceUp').length;
		var cardsUp = cardsUpAll - matchedCardCount;
		switch(cardsUp)
		{
			case 0:
				break;
			case 1:
<<<<<<< HEAD
				chosenCards[0] = $(this).attr('id');
				break;
			case 2:
				$gameGrid.off('click');
				chosenCards[1] = $(this).attr('id');
=======
				chosenCards[0] = $(this).parents('td.panel').attr('id');
				break;
			case 2:
				$gameGrid.off('click');
				chosenCards[1] = $(this).parents('td.panel').attr('id');
>>>>>>> d4426299ff2f176827f3ab54ae7676120d581c7d
				var src1 = $('#'+chosenCards[0]).find('.front').attr('src');
				var src2 = $('#'+chosenCards[1]).find('.front').attr('src');
				if(src1 === src2)
				{
					setTimeout(matchFound, 1000);
				}
				else
				{
					setTimeout(badMoveRecover, 2000);
				}
				break;
			default:
				/* Two cards should never be up at once if a
				move is being made. End the game.
				*/
		}
	}

	function matchFound()
	{
		if(--matchesLeft <= 0)
		{
			gameOver(true);
		}
		else
		{
			prepForNextMove();
		}
	}

	function badMoveRecover()
	{
		chosenCards.forEach(
			function(id)
			{
<<<<<<< HEAD
				$('#'+id).removeClass('faceUp');
=======
				$('#'+id).find('.flipper').removeClass('faceUp');
>>>>>>> d4426299ff2f176827f3ab54ae7676120d581c7d
			}
		);
		prepForNextMove();
	}

	function prepForNextMove()
	{
		chosenCards = [];
		$gameGrid.on('click', '.flipper', makeMove);
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
		// Make sure every card is face down
		$('.flipper').removeClass('faceUp');

		var orderedPics = [].concat(pictures);

		for(var i = orderedPics.length; i > 0; --i)
		{
			var index = Math.floor((Math.random() * i));
			$('#panel'+(i-1)+' .front').attr('src', orderedPics[index]);
			orderedPics.splice(index, 1);
		}
	}

	function setClock(newTime)
	{
		clockTime = (newTime > 0) ? newTime : 0;
		$clock.text(clockTime);
	}

	function updateClock()
	{
		setClock(--clockTime);
		if(clockTime <= 0)
		{
			gameOver(false);
		}
	}

	function gameOver(isWon)
	{
		if(isGameInSession)
		{
			if(isWon)
			{

				alert('You win!');
			}
			else
			{
				alert('Game Over');
			}
		}
		isGameInSession = false;
		$gameGrid.off('click');
		$('.flipper').removeClass('faceUp');
		clearInterval(timer);
		$startButton.click(start);
	}

	//This plays a file, and call a callback once it completed (if a callback is set)

	function play(audio, callback)
	{
		audio.play();
		if(callback)
		{
		    audio.onended = callback;
		}
	}

	function queueSounds(sounds)
	{
		var index = 0;
		recursivePlay();   

		function recursivePlay()
		{
			if(index === sounds.length-1)
			{
				play(sounds[index],null);
			}
			else
			{
				play(sounds[index],function(){index++; recursivePlay();});
			}
		}
	}

})();