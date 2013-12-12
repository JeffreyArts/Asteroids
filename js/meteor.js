
jQuery.fn.crMeteor = function($meteor, $size) {
	if (!$size) {
		$size=10;
	}
	
	// Check if span already exists, and create it when not.
	if (!$($meteor).length) {
		// Add meteor to game canvas, remove the # so the id is correct
		 $( "<span>" ).attr("class","meteor").attr("id",$meteor.replace("#", "")).appendTo( $game['canvas'] );
	}

	$game['objects'][$meteor] = {};

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
		
		$game['objects'][$meteor]['x'] = $game['width']*Math.random();
		$game['objects'][$meteor]['y'] = $game['height']*Math.random();

		$($meteor).css("width",$game['objects'][$meteor]['width']);
		$($meteor).css("height",$game['objects'][$meteor]['height']);




		$game['objects'][$meteor]['wrapping'] = {};
	    $game['objects'][$meteor]['wrapping']['top'] 	= -$game['objects'][$meteor]['height'];
	    $game['objects'][$meteor]['wrapping']['bottom']	=  $game['height']+($game['objects'][$meteor]['height']/2);
	    $game['objects'][$meteor]['wrapping']['left'] 	=  $game['posX']-$game['objects'][$meteor]['width'];
	    $game['objects'][$meteor]['wrapping']['right']	=  $game['width']+($game['objects'][$meteor]['width']/2);

		$game['objects'][$meteor]['speed']		= Math.random()*8+2;
		$game['objects'][$meteor]['vspeed']		= 0;
		$game['objects'][$meteor]['hspeed'] 	= 0;
		$game['objects'][$meteor]['direction'] 	= Math.random()*360;
	});
};


jQuery.fn.crSpaceship = function($spaceship, $size) {
	if (!$size) {
		$size=10;
	}
		$game['objects'][$spaceship] = {};

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
		$($spaceship).css("left",$game['width']/2);
		$($spaceship).css("top",$game['height']/2);
		
		
		// Set spaceship sizes
		$($spaceship).css("width",$game['objects'][$spaceship]['width']);
		$($spaceship).css("height",$game['objects'][$spaceship]['height']);

		$game['objects'][$spaceship]['wrapping'] = {};
	    $game['objects'][$spaceship]['wrapping']['top'] 	= -$game['objects'][$spaceship]['height']/1.25;
	    $game['objects'][$spaceship]['wrapping']['bottom']	=  $game['height']+($game['objects'][$spaceship]['height']/2);
	    $game['objects'][$spaceship]['wrapping']['left'] 	=  $game['posX']-$game['objects'][$spaceship]['width']/2;
	    $game['objects'][$spaceship]['wrapping']['right']	=  $game['width']+($game['objects'][$spaceship]['width']/4);

		$game['objects'][$spaceship]['speed']	= 0;
		$game['objects'][$spaceship]['vspeed']	= 0;
		$game['objects'][$spaceship]['hspeed'] 	= 0;
		$game['objects'][$spaceship]['direction'] 	= 0;
		$game['objects'][$spaceship]['min_speed'] 	= 0;
		$game['objects'][$spaceship]['max_speed'] 	= 12;
	});
};



jQuery.fn.crBullet = function($bullet,$x,$y,$direction) {
		
	$game['objects'][$bullet] = {};
	$game['objects'][$bullet]['x'] = $x;
	$game['objects'][$bullet]['y'] = $y;
	//Create bullet element (NOTE: replace the # so the id is correct)
	$( "<b>" ).attr( "class", "bullet" ).attr( "id",$bullet.replace("#", "")).css( "left",$x ).css( "top",$y ).appendTo( $game['canvas'] ).hide();
	$($bullet).fadeIn("fast");
	$game['objects'][$bullet]['speed']		= 16;
	$game['objects'][$bullet]['vspeed']		= 0;
	$game['objects'][$bullet]['hspeed'] 	= 0;
	$game['objects'][$bullet]['direction'] 	= $direction;


   	$().objBullet($bullet);
};


jQuery.fn.setGameConfig = function($canvas) {	
	$play=true;
	$game = {};
	$game['objects']= {};
	$game['standard']= {};
	$game['canvas']	= $canvas;
	$game['speed']	= 30;
	$game['width']	= $($canvas).width();
	$game['height']	= $($canvas).height()
	$game['posX']	= 0;
	$game['posY']	= 0;
	$game['bullet']	= 0;
	$game['standard']['speed']	= 10;
};










jQuery.fn.objMeteor = function($obj) {
    
    $game['objects'][$obj]['rotate'] = Math.round(Math.random()*360);


////	START interval 	///////////////////////////////////////////////////////////
    $game['objects'][$obj]['interval'] = setInterval(function(){    	


	    $(this).wrap($obj);
	    $(this).move($obj);
		$(this).direction($obj,$game['objects'][$obj]['direction']);

		$game['objects'][$obj]['rotate'] ++;
		$($obj).rotate($game['objects'][$obj]['rotate'] );
    },  $game['speed']);
////	END OF interval 	///////////////////////////////////////////////////////////



};

jQuery.fn.objBullet = function($obj) {
		$($obj).rotate($game['objects'][$obj]['direction']+90);
////	START interval 	///////////////////////////////////////////////////////////
    $game['objects'][$obj]['interval'] = setInterval(function(){    	

	    $(this).move($obj);
		$(this).direction($obj,$game['objects'][$obj]['direction']);


    	
	   	//Check collision
	   	for (var $with in $game.objects) {
	   		if ($with.indexOf("meteor") == 1) {
    			// Set game.lives -1
    			if ($().collisionCheck($obj,$with)) {
    				alert($with+" - "+$obj);
    			}
	   		} 
		}

		if ($game['objects'][$obj]['x']<$game['posX'] || $game['objects'][$obj]['x']>$game['width'] || $game['objects'][$obj]['y']<$game['posY'] || $game['objects'][$obj]['y']>$game['height']) {
			$($obj).deleteObject($obj);
		}

    },  $game['speed']);
////	END OF interval 	///////////////////////////////////////////////////////////



};


jQuery.fn.objSpaceship = function($obj) {
    
    
	$param = {};

////	START interval 	///////////////////////////////////////////////////////////
    $game['objects'][$obj]['interval'] = setInterval(function(){

    	  // Turn the ship
    	if ($param['turn']) {
			$game['objects'][$obj]['direction'] = $game['objects'][$obj]['direction']+$param['turn_speed'];
    	}


		  // Slow down
	   	if ($game['objects'][$obj]['slow_down']) {
	       	if ($game['objects'][$obj]['speed'] > $game['objects'][$obj]['min_speed']) {
	       		$game['objects'][$obj]['speed'] -= $game['objects'][$obj]['slow_down_speed'];
	       	} else {
	       		$game['objects'][$obj]['speed'] = $game['objects'][$obj]['min_speed'];
	       	}
	   	}
	
		  // Speed up
	   	if ($game['objects'][$obj]['speed_up']) {
	       	if ($game['objects'][$obj]['speed'] < $game['objects'][$obj]['max_speed']) {
	       		$game['objects'][$obj]['speed'] +=0.25;
	       	} else {
	       		$game['objects'][$obj]['speed'] = $game['objects'][$obj]['max_speed'];
	       	}
	   	}

	   	//Check collision
	   	for (var $with in $game.objects) {
	   		if ($with.indexOf("meteor") == 1) {
    			// Set game.lives -1
    			$().collisionCheck("#spaceship",$with);
	   		} 
		}



	    $(this).wrap($obj);
	    $(this).move($obj);
		$(this).direction($obj,$game['objects'][$obj]['direction']);
		$($obj).rotate($game['objects'][$obj]['direction']+90);
	    
    }, $game['speed']);
////	END OF interval 	///////////////////////////////////////////////////////////


//////////////////////////////////////
///	KEY PRESS EVENTS
//////////////////////////////////////

    // UP key - increase speed
	$(document).keydown(function(e) {
		if ( e.which == 38) {
			$game['objects'][$obj]['speed_up'] = true;
		}
	});
    
    
    // RIGHT key - change direction to right (+)
	$(document).keydown(function(e) {
		if ( e.which == 39) {
			$param['turn'] = true;
			$param['turn_speed'] = 6;
			$game['objects'][$obj]['direction'] += $param['turn_speed'];
		}
	});
    
    
    // DOWN key - decrease speed (FAST)
	$(document).keydown(function(e) {
		if ( e.which == 40) {
			$game['objects'][$obj]['speed'] -= 1;
		}
	});
    
    
    // LEFT key - change direction to left (-)
	$(document).keydown(function(e) {
		if ( e.which == 37) {
			$param['turn'] = true;
			$param['turn_speed'] = -6;
			$game['objects'][$obj]['direction'] += $param['turn_speed'];
		}
	});
    
    
    // SPACE - fire bullet
	$(document).keydown(function(e) {
		if ( e.which == 32) {
	    	$game['bullet']++;
			$radians = $game['objects'][$obj]['direction'] * (Math.PI/180)
			$new_y = $game['objects'][$obj]['y']+10;
			$new_x = $game['objects'][$obj]['x']+15;
	    	$(this).crBullet("#bullet"+$game['bullet'],$new_x,$new_y,$game['objects'][$obj]['direction']);		

	    }
	});
    

//////////////////////////////////////
///	KEY RELEASE EVENTS
//////////////////////////////////////
    
    // UP key - decrease speed
	$(document).keyup(function(e) {
		if ( e.which == 38) {
			$game['objects'][$obj]['speed_up'] = false;
			$game['objects'][$obj]['slow_down'] = true;
			$game['objects'][$obj]['slow_down_speed'] = 0.05;
		}
	});
    
    
    
    // RIGHT key - stop turning
	$(document).keyup(function(e) {
		if ( e.which == 39) {
			$param['turn'] = false;
		}
	});
    
    
    
    // LEFT key - stop turning
	$(document).keyup(function(e) {
		if ( e.which == 37) {
			$param['turn'] = false;
		}
	});
	
};


jQuery.fn.runGame = function($canvas) {

	// Move the objects
	for (var k in $game.objects) {
   		if (k.indexOf("meteor") == 1) {
   			$(document).objMeteor(k);
   		} else if (k.indexOf("spaceship") == 1) {
   			$(document).objSpaceship(k);
   		} else {
   		// Error - Object doesn't exists
   		}
	}
}























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
    
    if ($speed.length != null) {
    	$speed = $game['standard']['speed'];
    }

	while ($degrees>=360) {
		$degrees-=360;
	}
	$radians = $degrees * (Math.PI/180)

	$hspeed = $speed*Math.cos($radians);
	$vspeed = $speed*Math.sin($radians);

	$game['objects'][$obj]['hspeed'] = $hspeed;
	$game['objects'][$obj]['vspeed'] = $vspeed;
	$game['objects'][$obj]['speed']  = $speed;
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
*	- Delete function -
*	This function deletes the object
*
* 	[object] $obj	= The object (id) which needs to be deleted 
*  
 */
jQuery.fn.deleteObject = function($obj) {

	$($obj).remove();
	if ($game['objects'][$obj]['interval'] >0) {
		clearInterval($game['objects'][$obj]['interval']);
	}
	delete $game['objects'][$obj];

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

    $game['objects'][$obj]['x'] = parseInt($($obj).css("left").replace("px",""),0);
    $game['objects'][$obj]['y'] = parseInt($($obj).css("top").replace("px",""),0);

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

    if ($game['objects'][$obj]['x']>$game['objects'][$obj]['wrapping']['right']) {
        $($obj).css("left",$game['objects'][$obj]['wrapping']['left']);
    }
    if ($game['objects'][$obj]['x']<=$game['objects'][$obj]['wrapping']['left']) {
        $($obj).css("left",$game['objects'][$obj]['wrapping']['right']);
    }
    if ($game['objects'][$obj]['y']<$game['objects'][$obj]['wrapping']['top']) {
        $($obj).css("top",$game['objects'][$obj]['wrapping']['bottom']);
    }
    if ($game['objects'][$obj]['y']>$game['objects'][$obj]['wrapping']['bottom']) {
        $($obj).css("top",$game['objects'][$obj]['wrapping']['top']);
    }

}





/*
*	- CollisionCheck function -
*	This function loops through the $game['objects'] array and reports all collisions into the array $game['collision']['objA'] = 'objB';
*  
 */
jQuery.fn.collisionCheck = function($obj,$with) {
    //Set the wrapping
    
    // Set $obj sizes 
    $obj_left	= $game['objects'][$obj]['x']-$game['objects'][$obj]['width']/2;
    $obj_right	= $game['objects'][$obj]['x']+$game['objects'][$obj]['width']/2;
    $obj_top 	= $game['objects'][$obj]['y']-$game['objects'][$obj]['height']/2;
    $obj_bottom	= $game['objects'][$obj]['y']+$game['objects'][$obj]['height']/2;

    // Set $with sizes 
    $with_left	= $game['objects'][$with]['x']-$game['objects'][$with]['width']/2;
    $with_right = $game['objects'][$with]['x']+$game['objects'][$with]['width']/2;
    $with_top 	= $game['objects'][$with]['y']-$game['objects'][$with]['height']/2;
    $with_bottom= $game['objects'][$with]['y']+$game['objects'][$with]['height']/2;
    
    if ($obj_right>$with_left && $obj_left<$with_right && $obj_top<$with_bottom && $obj_bottom>$with_top) {
    	return "HIT!";
    } else {
        return ("x: "+$game['objects'][$obj]['x']+"\ny: "+$game['objects'][$obj]['y']+"\n--------------\nx: "+$game['objects'][$with]['x']+"\ny: "+$game['objects'][$with]['y'])
    }
    
/*
	for (var $target in $game.objects) {
   		if (k.indexOf("meteor") == 1) {
   			$(document).objMeteor(k);
   		} else if (k.indexOf("spaceship") == 1) {
   			$(document).objSpaceship(k);
   		} else {
   		// Systeem kent dit object niet
   		}
	}*/

}