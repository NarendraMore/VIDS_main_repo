import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableHeaderCheckbox, TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DataViewModule } from 'primeng/dataview';
import { KnobModule } from 'primeng/knob';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SidebarModule } from 'primeng/sidebar';


import { MultiSelectModule } from 'primeng/multiselect';
import { TreeSelectModule } from 'primeng/treeselect';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChipsModule } from 'primeng/chips';
import { ProgressBarModule } from 'primeng/progressbar';
import { MenuItem } from 'primeng/api';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';

import { TagModule } from 'primeng/tag';
import {DividerModule} from 'primeng/divider';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    
    ButtonModule,
    ToolbarModule,
    FileUploadModule,
    CardModule,
    DialogModule,
    InputTextModule,
    TableModule,
    InputSwitchModule,
    TabViewModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    CascadeSelectModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    EditorModule,
    InputTextareaModule,
    DataViewModule,
    KnobModule,
    StepsModule,
    TabMenuModule,
    CheckboxModule,
    BreadcrumbModule,
    SidebarModule,
    TagModule,
    MultiSelectModule,
    TreeSelectModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    TooltipModule,
    InputMaskModule,
    OverlayPanelModule,
    PaginatorModule,
    AutoCompleteModule,
    SelectButtonModule,
    ChipsModule,
    ProgressBarModule,
    ConfirmPopupModule
    
  ],
  exports: [
    RouterModule,
    ButtonModule,
    ToolbarModule,
    FileUploadModule,
    ConfirmPopupModule,
    CardModule,
    DialogModule,
    InputTextModule,
    TableModule,
    InputSwitchModule,
    TabViewModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    CascadeSelectModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    EditorModule,
    InputTextareaModule,
    DataViewModule,
    KnobModule,
    StepsModule,
    TabMenuModule,
    CheckboxModule,
    BreadcrumbModule,
    SidebarModule,
    MultiSelectModule,
    TreeSelectModule,
    CalendarModule,
    ProgressSpinnerModule,
    TooltipModule,
    InputMaskModule,
    OverlayPanelModule,
    PaginatorModule,
    AutoCompleteModule,
    SelectButtonModule,
    ChipsModule,
    TagModule,
    ProgressBarModule
  ]
})
export class SharedModuleModule { }
