import { NgModule } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faCalendar,
  faCalendarPlus,
  faCheckCircle,
  faEye,
  faEnvelope,
  faUser,
  faSave,
  faPaperPlane,
  faFileAlt,
  faWindowClose,
} from '@fortawesome/free-regular-svg-icons';


import {
  faAngleUp,
  faAngleRight,
  faAngleLeft,
  faCog,
  faPlus,
  faFileExcel,
  faMinus,
  faPencilAlt,
  faTrash,
  faCalendarAlt,
  faCheck,
  faUpload,
  faTimesCircle,
  faSort,
  faSortUp,
  faSortDown,
  faPaperclip,
  faFileUpload,
  faExclamationTriangle,
  faSpinner,
  faStickyNote,
  faTimes,
  faDownload,
  faEllipsisV,
  faCaretDown,
  faCaretUp,
  faEllipsis,
  faThList,
  faRectangleList,
  faSquare,
  faCircleInfo
} from '@fortawesome/free-solid-svg-icons';



@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    // add icons to the library for convenient access in other components
    library.addIcons(
      faCaretDown,
      faCaretUp,
      faEllipsis,
      faThList,
      faRectangleList,
      faSquare,
      faWindowClose,
      faBell,
      faAngleUp,
      faAngleRight,
      faAngleLeft,
      faCog,
      faPlus,
      faMinus,
      faFileExcel,
      faCalendar,
      faPencilAlt,
      faTrash,
      faCheckCircle,
      faCalendarAlt,
      faCalendarPlus,
      faCheck,
      faUpload,
      faDownload,
      faEllipsisV,
      faTimesCircle,
      faEye,
      faSort,
      faSortUp,
      faSortDown,
      faPaperclip,
      faFileUpload,
      faEnvelope,
      faUser,
      faSave,
      faExclamationTriangle,
      faPaperPlane,
      faSpinner,
      faStickyNote,
      faTimes,
      faFileAlt,
      faSave,
      faCircleInfo
    );

  }
}
