import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class VehicleUpdatePage {
  pageTitle: ElementFinder = element(by.id('maxApp.vehicle.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#vehicle-my-suffix-description'));
  plateNumberInput: ElementFinder = element(by.css('input#vehicle-my-suffix-plateNumber'));
  modelInput: ElementFinder = element(by.css('input#vehicle-my-suffix-model'));
  photoInput: ElementFinder = element(by.css('input#file_photo'));
  vehicleTypeSelect: ElementFinder = element(by.css('select#vehicle-my-suffix-vehicleType'));
  locationSelect: ElementFinder = element(by.css('select#vehicle-my-suffix-location'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setPlateNumberInput(plateNumber) {
    await this.plateNumberInput.sendKeys(plateNumber);
  }

  async getPlateNumberInput() {
    return this.plateNumberInput.getAttribute('value');
  }

  async setModelInput(model) {
    await this.modelInput.sendKeys(model);
  }

  async getModelInput() {
    return this.modelInput.getAttribute('value');
  }

  async setPhotoInput(photo) {
    await this.photoInput.sendKeys(photo);
  }

  async getPhotoInput() {
    return this.photoInput.getAttribute('value');
  }

  async vehicleTypeSelectLastOption() {
    await this.vehicleTypeSelect.all(by.tagName('option')).last().click();
  }

  async vehicleTypeSelectOption(option) {
    await this.vehicleTypeSelect.sendKeys(option);
  }

  getVehicleTypeSelect() {
    return this.vehicleTypeSelect;
  }

  async getVehicleTypeSelectedOption() {
    return this.vehicleTypeSelect.element(by.css('option:checked')).getText();
  }

  async locationSelectLastOption() {
    await this.locationSelect.all(by.tagName('option')).last().click();
  }

  async locationSelectOption(option) {
    await this.locationSelect.sendKeys(option);
  }

  getLocationSelect() {
    return this.locationSelect;
  }

  async getLocationSelectedOption() {
    return this.locationSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPlateNumberInput('plateNumber');
    expect(await this.getPlateNumberInput()).to.match(/plateNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setModelInput('model');
    expect(await this.getModelInput()).to.match(/model/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhotoInput(absolutePath);
    await this.vehicleTypeSelectLastOption();
    await this.locationSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
