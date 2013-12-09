
jQuery.fn.crMeteor = function($meteor, $size) {
	if (!$size) {
		$size=10;
	}
	
	// Check if span already exists, and create it when not.
	if (!$($meteor).length) {
		// Add meteor to game canvas, remove the # so the id is correct
		 $( "<span>" ).attr("class","meteor").attr("id",$meteor.replace("#", "")).appendTo( $game['canvas'] );
	}

	$game['objects'][$meteor] = [];

	var $meteor_type = Math.floor(Math.random() * 3) + 1; // 3 = number of meteor types
	var $file_location = "json/meteors.json";


	$.getJSON( $file_location, {
	        format: "json"
	}).done(function( $data ) {
	    $x=0; //Startposition x
	    $y=0; //Startposition y
	    $i=1; // 'Partnumber'
	    $arr= [];

	    $selected_meteor = $data.meteors["meteor"+$meteor_type];
	    $.each( $selected_meteor, function( $key, $column ) {
	        $arr[$y]= [];
	        $.each( $column, function( $key, $part ) {
	            
	            $arr[$y][$x]=$i;
	             $( "<b>" ).attr( "class", $part[0].specs ).css( "left",$x*$size ).css( "top",$y*$size ).appendTo( $meteor );
	            $x++;
	            $i++;
	        });
	        
 				$game['objects'][$meteor]['width'] = $size*$x;

	        $x=0;
	        $y++;
	    });
	        
		$game['objects'][$meteor]['height'] = $size*$y;
		
		// Set meteor sizes
		$($meteor).css("margin-left",$game['width']*Math.random());
		$($meteor).css("margin-top",$game['height']*Math.random());
		$($meteor).css("width",$game['objects'][$meteor]['width']);
		$($meteor).css("height",$game['objects'][$meteor]['height']);

		$param = [];
		$param['left'] = (Math.random()*12-12)+2;
		$param['top'] = (Math.random()*12-12)+2;
		$param['rotating_speed'] =$param['top'];
		// All variables set, let's move it!
   		$(document).objMeteor($meteor,$param);
	});
};


jQuery.fn.crSpaceship = function($spaceship, $size) {
	if (!$size) {
		$size=10;
	}
		$game['objects'][$spaceship] = [];

	var $file_location = "json/meteors.json";


	$.getJSON( $file_location, {
	        format: "json"
	}).done(function( $data ) {
	    $x=0; //Startposition x
	    $y=0; //Startposition y
	    $i=1; // 'Partnumber'
	    $arr= [];

	    $selected_spaceship = $data.spaceship;
	    $.each( $selected_spaceship, function( $key, $column ) {
	        $arr[$y]= [];
	        $.each( $column, function( $key, $part ) {
	            
	            $arr[$y][$x]=$i;
	             $( "<b>" ).attr( "class", $part[0].specs ).css( "left",$x*$size ).css( "top",$y*$size ).appendTo( $spaceship );
	            $x++;
	            $i++;
	        });
	        
 				$game['objects'][$spaceship]['width'] = $size*$x;

	        $x=0;
	        $y++;
	    });

		//$param['key']['power'] = 38;
	        
		$game['objects'][$spaceship]['height'] = $size*$y;
		
		// Set spaceship sizes
		$($spaceship).css("width",$game['objects'][$spaceship]['width']);
		$($spaceship).css("height",$game['objects'][$spaceship]['height']);


		$game['objects'][$spaceship]['speed']	= 3;
		$game['objects'][$spaceship]['vspeed']	= 0;
		$game['objects'][$spaceship]['hspeed'] 	= 0;
		$game['objects'][$spaceship]['direction'] 	= 0;
		$param['min_speed'] = 1;
		$param['max_speed'] = 12;

		// All variables set, let's move it!
   		$(document).objSpaceship($spaceship,$param);
	});
};


jQuery.fn.setGameConfig = function($canvas) {	
	$play=true;
	$game = [];
	$game['objects']= [];
	$game['canvas']	= $canvas;
	$game['width']	= $($canvas).width();
	$game['height']	= $($canvas).height()
	$game['posX']	= $($canvas).offset().left;
	$game['posY']	= $($canvas).offset().top;
};


jQuery.fn.objMeteor = function($obj,$param) {
    
    $wrapping = [];
    $wrapping['top'] = -$game['objects'][$obj]['height']/2;
    $wrapping['bottom'] = $game['height']+($game['objects'][$obj]['height']/2);
    $wrapping['left'] = $game['posX']-$game['objects'][$obj]['width']/2;
    $wrapping['right'] = $game['width']+($game['objects'][$obj]['width']/2);


    setInterval(function(){    	
    	//Canvas Warpping - The parameter are set outside the interval, they ARE NESCESSARY !!!
	    $(this).wrap($obj);


		$param['rotating_speed']++;

		$($obj).rotate($param['rotating_speed']);
       	$($obj).css("left","+="+$param['left']);
        $($obj).css("top","+="+$param['top']);
    }, 30);
};



jQuery.fn.objSpaceship = function($obj,$param) {
    
    $wrapping = [];
    $wrapping['top'] = -$game['objects'][$obj]['height']/2;
    $wrapping['bottom'] = $game['height']+($game['objects'][$obj]['height']/2);
    $wrapping['left'] = $game['posX']-$game['objects'][$obj]['width']/2;
    $wrapping['right'] = $game['width']+($game['objects'][$obj]['width']/2);
    


    setInterval(function(){

    	  // Turn the ship
    	if ($param['turn']) {
			$game['objects'][$obj]['direction'] = $game['objects'][$obj]['direction']+$param['turn_speed'];
    	}


		  // Slow down
	   	if ($game['objects'][$obj]['slow_down']) {
	       	if ($game['objects'][$obj]['speed'] > $param['min_speed']) {
	       		$game['objects'][$obj]['speed'] -= $game['objects'][$obj]['slow_down_speed'];
	       	} else {
	       		$game['objects'][$obj]['speed'] = $param['min_speed'];
	       	}
	   	}
	
		  // Speed up
	   	if ($game['objects'][$obj]['speed_up']) {
	       	if ($game['objects'][$obj]['speed'] < $param['max_speed']) {
	       		$game['objects'][$obj]['speed'] +=0.25;
	       	} else {
	       		$game['objects'][$obj]['speed'] = $param['max_speed'];
	       	}
	   	}



	    $(this).wrap($obj);
	    $(this).move($obj);
		$(this).direction($obj,$game['objects'][$obj]['direction']);
		$($obj).rotate($game['objects'][$obj]['direction']+90);
	    
    }, 30);
////	END OF interval 	///////////////////////////////////////////////////////////
    
    // Pressing the UP key increase speed
	$(document).keydown(function(e) {
		if ( e.which == 38) {
			$game['objects'][$obj]['speed_up'] = true;
		}
	});
    
    
    // Pressing the RIGHT key change direction to right (+)
	$(document).keydown(function(e) {
		if ( e.which == 39) {
			$param['turn'] = true;
			$param['turn_speed'] = 6;
			$game['objects'][$obj]['direction'] += $param['turn_speed'];
		}
	});
    
    
    // Pressing the LEFT key change direction to left (-)
	$(document).keydown(function(e) {
		if ( e.which == 37) {
			$param['turn'] = true;
			$param['turn_speed'] = -6;
			$game['objects'][$obj]['direction'] += $param['turn_speed'];
		}
	});
    
    
    // Releasing the UP key decrease speed
	$(document).keyup(function(e) {
		if ( e.which == 38) {
			$game['objects'][$obj]['speed_up'] = false;
			$game['objects'][$obj]['slow_down'] = true;
			$game['objects'][$obj]['slow_down_speed'] = 0.05;
		}
	});
    
    
    
    // Releasing the RIGHT or LEFT key to stop turning
	$(document).keyup(function(e) {
		if ( e.which == 39) {
			$param['turn'] = false;
		}
	});
    
    
    
    // Releasing the RIGHT or LEFT key to stop turning
	$(document).keyup(function(e) {
		if ( e.which == 37) {
			$param['turn'] = false;
		}
	});
    
    
    // Pressing the DOWN key decrease speed (FAST)
	$(document).keydown(function(e) {
		if ( e.which == 40) {
			$game['objects'][$obj]['speed'] -= 1;
		}
	});
	
};



/*
*	- Direction function -
*	This function takes gives
*
* 	$obj = id of the targetted element. (ex. "#meteor1")
*  
 */
jQuery.fn.direction = function($obj, $degrees) {
    //Load the general variable into a local var for better readability
    $speed = $game['objects'][$obj]['speed'];
	while ($degrees>=360) {
		$degrees-=360;
	}
	$radians = $degrees * (Math.PI/180)

	$hspeed = $speed*Math.cos($radians);
	$vspeed = $speed*Math.sin($radians);
	//$new_direction = $direction*Math.atan2($game['objects'][$obj]['vspeed'], $game['objects'][$obj]['hspeed'])

	$game['objects'][$obj]['hspeed'] = $hspeed;
	$game['objects'][$obj]['vspeed'] = $vspeed;

	$(this).gamelog("hspeed "+$hspeed+" | vspeed "+$vspeed+" | radians "+$radians+" | speed "+$speed+"|  d"+$degrees);

}





/*
*	- Game log function -
*	This function adds a log to the .log class
*
* 	[string] $data	= The data you want to log. 
*  
 */
window.log_id = 0; // This is the general log id
jQuery.fn.gamelog = function($data) {

	window.log_id+=1;
	$(".log ul").before("<li id='id"+window.log_id+"'>"+$data+"</li>");
	if (window.log_id >= 20) {
		tmp = window.log_id-20;
		$("#id"+tmp).remove();
	}

}



/*
*	- Move function -
*	This function takes gives
*
* 	$obj = id of the targetted element. (ex. "#meteor1")
*  
 */
jQuery.fn.move = function($obj) {

    //Load the general variables into a local var for better readability
    $hspeed = $game['objects'][$obj]['hspeed'];
    $vspeed = $game['objects'][$obj]['vspeed'];

    $($obj).css("top","+="+$vspeed);
    $($obj).css("left","+="+$hspeed);


	$game['objects'][$obj]['x'] = $($obj).offset().left;
	$game['objects'][$obj]['y'] = $($obj).offset().top;


}





/*
*	- Wrap function -
*	This function takes care of the objects wrapping around the game canvas
*
* 	$obj = id of the targetted element. (ex. "#meteor1")
*  
 */
jQuery.fn.wrap = function($obj) {
    //Set the wrapping


    if ($($obj).offset().left>$wrapping['right']) {
        $($obj).css("left","-="+$wrapping['right']);
    }
    if ($($obj).offset().left<=$wrapping['left']) {
        $($obj).css("left","+="+$wrapping['right']);
    }
    if ($($obj).offset().top>$wrapping['bottom']) {
        $($obj).css("top","-="+$wrapping['bottom']);
    }
    if ($($obj).offset().top<=$wrapping['top']+$game['objects'][$obj]['width']) {
        $($obj).css("top","+="+$wrapping['bottom']);
    }

}