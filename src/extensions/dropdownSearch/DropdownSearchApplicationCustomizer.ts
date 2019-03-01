import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import * as jQuery from 'jquery';

import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'DropdownSearchApplicationCustomizerStrings';

const LOG_SOURCE: string = 'DropdownSearchApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IDropdownSearchApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class DropdownSearchApplicationCustomizer
  extends BaseApplicationCustomizer<IDropdownSearchApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {

    jQuery('body').on('click', '.ms-Dropdown', function() {
      // Pause for dropdown to load in
      setTimeout(function() {
        jQuery('.ms-Dropdown-items').prepend("<input placeholder='Search' class='dropdown-search-input js-dropdown-search-input' />");
      }, 1);
    });

    jQuery('body').on('keyup' , '.js-dropdown-search-input', function() {
      var searchText = jQuery(".js-dropdown-search-input").val().toLowerCase();

      // Hide all the options intially
      jQuery('.ms-Dropdown-optionText').parents('button').hide();
  
      jQuery('.ms-Dropdown-optionText').each(function() {
        if (jQuery(this).text().toUpperCase().indexOf(searchText.toUpperCase()) != -1) {
          jQuery(this).parents('button').show();
        }
      });
    });

    // Add styles
    jQuery("<style type='text/css'>.dropdown-search-input{ width: 100%;padding: 10px 0 10px 18px;border: none;}</style>").appendTo("head");

    return Promise.resolve();
  }
}
