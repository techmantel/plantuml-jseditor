
var editor = (function() {

	var timer = 0;

	delay = function() {
    	clearTimeout (timer);
    	timer = setTimeout(function() {
    			$loader = $('#loader');
    			$loader.css('display', 'block');
		    	var code = $('#code').val();
		    	var code = unescape(encodeURIComponent(code));
		    	var deflated_code = deflate(code, 9);
		    	var encoded_code = encode64(deflated_code);
		      	$('#diagram').attr('src', editor.config.plantUmlUrl + encoded_code)
		      	$loader.css('display', 'none');		      	
    	}, 1000);
	};
	  
  	encode64 = function(data) {
		r = "";
		for (i=0; i<data.length; i+=3) {
	 		if (i+2==data.length) {
				r +=append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
			} else if (i+1==data.length) {
				r += append3bytes(data.charCodeAt(i), 0, 0);
			} else {
				r += append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), data.charCodeAt(i+2));
			}
		}
		return r;
	};

	append3bytes = function(b1, b2, b3) {
		c1 = b1 >> 2;
		c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
		c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
		c4 = b3 & 0x3F;
		r = "";
		r += encode6bit(c1 & 0x3F);
		r += encode6bit(c2 & 0x3F);
		r += encode6bit(c3 & 0x3F);
		r += encode6bit(c4 & 0x3F);
		return r;
	};
	
	encode6bit = function(b) {
		if (b < 10) {
	 		return String.fromCharCode(48 + b);
		}
		b -= 10;
		if (b < 26) {
	 		return String.fromCharCode(65 + b);
		}
		b -= 26;
		if (b < 26) {
	 		return String.fromCharCode(97 + b);
		}
		b -= 26;
		if (b == 0) {
	 		return '-';
		}
		if (b == 1) {
	 		return '_';
		}
		return '?';
	};  
        
    return {
    	
    	config: {
    		plantUmlUrl: 'http://www.plantuml.com/plantuml/img/'
    	},
    	
		init: function(){
			$('#code').on('keyup', function() {
				delay();
			});
		}
    };  
})();
