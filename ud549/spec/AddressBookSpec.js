describe('Address Book', function() {
	let addressBook, thisContact;

	beforeEach(function() {
		addressBook = new AddressBook();
		thisContact = new Contact();
	});

	it('should be able to add a blank contact', function() {
		addressBook.addContact(thisContact);
		expect(addressBook.getContact(0)).toBe(thisContact);
	});

	it('should be able to add a contact', function() {
		let filledContact = new Contact('Hesham', 238182374);

		addressBook.addContact(filledContact);
		expect(addressBook.getContact(0)).toBe(filledContact);
		expect(addressBook.getContact(0).getName()).toBe(filledContact.getName());
		expect(addressBook.getContact(0).getNumber()).toBe(filledContact.getNumber());
	});

	it('should be able to delete contact', function() {
		addressBook.addContact(thisContact);
		addressBook.deleteContact(0);
		expect(addressBook.getContact(0)).not.toBeDefined();
	});
});

describe('Async Address Book', function() {
	let addressBook = new AddressBook();

	beforeEach(function(done) {
		addressBook.getInitialContacts(function() {
			done();
		});
	});

	it('should grab initial contacts', function(done) {
		expect(addressBook.initialComplete).toBe(true);
		done();
	});
});