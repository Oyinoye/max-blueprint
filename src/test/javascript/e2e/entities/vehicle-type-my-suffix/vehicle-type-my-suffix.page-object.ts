import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleTypeUpdatePage from './vehicle-type-my-suffix-update.page-object';

const expect = chai.expect;
export class VehicleTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('maxApp.vehicleType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-type-my-suffix-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('vehicle-type-my-suffix');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleType() {
    await this.createButton.click();
    return new VehicleTypeUpdatePage();
  }

  async deleteVehicleType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleTypeDeleteDialog = new VehicleTypeDeleteDialog();
    await waitUntilDisplayed(vehicleTypeDeleteDialog.deleteModal);
    expect(await vehicleTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/maxApp.vehicleType.delete.question/);
    await vehicleTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleTypeDeleteDialog.deleteModal);

    expect(await isVisible(vehicleTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
