function Bird(){
	this.y = height/2;
	this.x = 64;

	this.gravity = 0.6;
	this.lift = 15;
	this.velocity = 0;

	this.show = funtion(){
		fill(255);
		ellipse(this.w, this.y, 16, 16);
		
	}

	this.up = function(){
		this.velocity += -this.gravity * 10;
	}

	this.update = function(){
		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.y += this.velocity;

		if (this.y > height){
			this.y = height;
			this.velocity = 0;
		}

		if (this.y < height){
			this.y = height;
			this.velocity = 0;
		}
	}

}