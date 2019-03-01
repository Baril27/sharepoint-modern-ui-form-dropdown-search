import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import * as jQuery from 'jquery';

import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'DropdownSearchApplicationCustomizerStrings';

// MS Variables
const MS_DROPDOWN_CLASS: string = 'ms-Dropdown',
MS_DROPDOWN_ITEMS_CLASS: string = 'ms-Dropdown-items',
MS_DROPDOWN_OPTION_TEXT_CLASS: string = 'ms-Dropdown-optionText';

// Extension Variables
const DROPDOWN_SEARCH_INPUT_CLASS: string = 'dropdown-search-input',
DROPDOWN_SEARCH_INPUT_JS_CLASS: string = 'js-dropdown-search-input',
DROPDOWN_SEARCH_INPUT_PLACEHOLDER_TEXT: string = 'Search';


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IDropdownSearchApplicationCustomizerProperties {
  // This is an example; replace with your own property
  // testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class DropdownSearchApplicationCustomizer
  extends BaseApplicationCustomizer<IDropdownSearchApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {

    this.addStyles(),
    this.addSearchInput(),
    this.listenForSearchInput();

    return Promise.resolve();
  }

  // Add search input to any dropdown field
  private addSearchInput() {
    jQuery('body').on('click', '.' + MS_DROPDOWN_CLASS, function() {
      // Pause for dropdown to load in
      setTimeout(function() {
        jQuery('.' + MS_DROPDOWN_ITEMS_CLASS).prepend(`
          <input placeholder='` + DROPDOWN_SEARCH_INPUT_PLACEHOLDER_TEXT + `' class='` + DROPDOWN_SEARCH_INPUT_CLASS + ' ' + DROPDOWN_SEARCH_INPUT_JS_CLASS + `' />
        `);
      }, 1);
    });
  }

  // Listen for any search input and filter dropdown based on input
  private listenForSearchInput() {
    jQuery('body').on('keyup' ,'.' +  DROPDOWN_SEARCH_INPUT_JS_CLASS, function() {
      var searchText = jQuery('.' + DROPDOWN_SEARCH_INPUT_JS_CLASS).val().toString().toLowerCase();

      // Hide all the options initially
      jQuery('.' + MS_DROPDOWN_OPTION_TEXT_CLASS).parents('button').hide();
  
      jQuery('.' + MS_DROPDOWN_OPTION_TEXT_CLASS).each(function() {
        if (jQuery(this).text().toUpperCase().indexOf(searchText.toUpperCase()) != -1) {
          jQuery(this).parents('button').show();
        }
      });
    });
  }

  private addStyles() {
    // Add styles for injected input
    jQuery(`
      <style type='text/css'>
        .` + DROPDOWN_SEARCH_INPUT_CLASS + ` {
          width: 100%;
          padding: 10px 0 10px 18px;
          border: none;
        }
      </style>
    `).appendTo("head");
  }
}
