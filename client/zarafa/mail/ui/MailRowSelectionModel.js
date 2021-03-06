Ext.namespace('Zarafa.mail.ui');

/**
 * @class Zarafa.mail.ui.MailRowSelectionModel
 * @extends Ext.grid.RowSelectionModel
 *
 * The {@link Zarafa.mail.ui.MailRowSelectionModel MailRowSelectionModel}
 * is the {@link Ext.grid.RowSelectionModel RowSelectionModel} used in the
 * {@link Zarafa.mail.ui.MailGrid MailGrid}.
 * It checks columns that have the preventRowSelection property and triggers actions depending on it.
 * See {@link #handleMouseDown}
 */
Zarafa.mail.ui.MailRowSelectionModel = Ext.extend(Ext.grid.RowSelectionModel, {
	/**
	 * Overriden to test for custom columns.
	 * If one of the columns of interest is clicked, then the row should not be selected.
	 * Otherwise call original handler.
	 * 'cellmousedown' does not fire when drag&drop is installed on a component,
	 * otherwise it may have been possible to cancel selection from there by returning false.
	 *
	 * @param {Zarafa.mail.ui.MailGrid} g The mail grid from which the event came
	 * @param {Number} rowIndex Index of the row that was clicked
	 * @param {Ext.EventObject} event The mouse event
	 *
	 * @override
	 * @private
	 */
	handleMouseDown : function(g, rowIndex, event)
	{
		var cm = g.getColumnModel();
		// get cell index from event object
		var cellIndex = g.getView().findCellIndex(event.getTarget());

		// boolean to determine what we are going to do
		var preventRowSelection = false;
		if (Ext.get(event.target).hasClass('icon_flag')) {
			preventRowSelection = true;
		} else if (cellIndex !== false && cellIndex >= 0) {
			preventRowSelection = cm.config[cellIndex].preventRowSelection;
		} else if ( cellIndex === false && Ext.get(event.target).hasClass('k-category-add') ){
			// Prevent selection when the mousedown event is on the 'add category icon'
			preventRowSelection = true;
		}

		if (preventRowSelection !== true) {
			Zarafa.mail.ui.MailRowSelectionModel.superclass.handleMouseDown.call(this, g, rowIndex, event);
		} else {
			// We must still set the focus on the clicked element, or else the grid will jump to
			// the previous focussed element when we close a dialog
			g.getView().focusRow(rowIndex);
		}
	}
});

Ext.reg('zarafa.mailrowselectionmodel', Zarafa.mail.ui.MailRowSelectionModel);
