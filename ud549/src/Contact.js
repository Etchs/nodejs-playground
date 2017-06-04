function Contact(name, number) {
	if(name!==undefined && number!==undefined && typeof(name)==='string' && typeof(number)==='number') {
		this._constructContact(name, number);
	}
}

Contact.prototype._constructContact = function(name, number) {
	this.name = name;
	this.number = number;
};

Contact.prototype.getName = function() {
	return this.name;
};

Contact.prototype.getNumber = function() {
	return this.number;
}