function AddressBook() {
	this.contacts = [];
	this.initialComplete = false;
}

AddressBook.prototype.getInitialContacts = function(cb) {
	var self = this;

	setTimeout(function(){
		self.initialComplete = true;
		if(cb) {
			return cb();
		}
	}, 30);
};

AddressBook.prototype.addContact = function(contact) {
	this.contacts.push(contact);
};

AddressBook.prototype.getContact = function(i) {
	// if(typeof(i)==='number' && this.contacts[i]!==undefined) {
	if(typeof(i)==='number') {
		return this.contacts[i];
	} else {
		throw new Error("Wrong index!");
	}
};

AddressBook.prototype.deleteContact = function(i) {
	if(typeof(i)==='number' && this.contacts[i]!==undefined) {
		this.contacts.splice(i, 1);
	} else {
		throw new Error("Wrong index!");
	}
};