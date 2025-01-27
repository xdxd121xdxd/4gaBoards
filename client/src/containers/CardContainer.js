import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import selectors from '../selectors';
import entryActions from '../entry-actions';
import { BoardMembershipRoles } from '../constants/Enums';
import Card from '../components/Card';

const makeMapStateToProps = () => {
  const selectCardById = selectors.makeSelectCardById();
  const selectUsersByCardId = selectors.makeSelectUsersByCardId();
  const selectLabelsByCardId = selectors.makeSelectLabelsByCardId();
  const selectTasksByCardId = selectors.makeSelectTasksByCardId();
  const selectNotificationsTotalByCardId = selectors.makeSelectNotificationsTotalByCardId();
  const selectAttachmentsCountByCardId = selectors.makeSelectAttachmentsCountByCardId();
  const selectCommentsCountByCardId = selectors.makeSelectCommentsCountByCardId();

  return (state, { id, index }) => {
    const currentCardId = selectors.selectPath(state).cardId;
    const isOpen = currentCardId === id;

    const { projectId } = selectors.selectPath(state);
    const allProjectsToLists = selectors.selectProjectsToListsForCurrentUser(state);
    const allBoardMemberships = selectors.selectMembershipsForCurrentBoard(state);
    const allLabels = selectors.selectLabelsForCurrentBoard(state);
    const currentUserMembership = selectors.selectCurrentUserMembershipForCurrentBoard(state);

    const { name, dueDate, timer, coverUrl, description, boardId, listId, isPersisted } = selectCardById(state, id);

    const users = selectUsersByCardId(state, id);
    const labels = selectLabelsByCardId(state, id);
    const tasks = selectTasksByCardId(state, id);
    const notificationsTotal = selectNotificationsTotalByCardId(state, id);
    const attachmentsCount = selectAttachmentsCountByCardId(state, id);
    const commentsCount = selectCommentsCountByCardId(state, id);

    const isCurrentUserEditor = !!currentUserMembership && currentUserMembership.role === BoardMembershipRoles.EDITOR;

    return {
      id,
      index,
      name,
      dueDate,
      timer,
      coverUrl,
      boardId,
      listId,
      projectId,
      isPersisted,
      isOpen,
      notificationsTotal,
      users,
      labels,
      tasks,
      description,
      attachmentsCount,
      commentsCount,
      allProjectsToLists,
      allBoardMemberships,
      allLabels,
      canEdit: isCurrentUserEditor,
    };
  };
};

const mapDispatchToProps = (dispatch, { id }) =>
  bindActionCreators(
    {
      onUpdate: (data) => entryActions.updateCard(id, data),
      onMove: (listId, index) => entryActions.moveCard(id, listId, index),
      onTransfer: (boardId, listId) => entryActions.transferCard(id, boardId, listId),
      onDelete: () => entryActions.deleteCard(id),
      onUserAdd: (userId) => entryActions.addUserToCard(userId, id),
      onUserRemove: (userId) => entryActions.removeUserFromCard(userId, id),
      onBoardFetch: entryActions.fetchBoard,
      onLabelAdd: (labelId) => entryActions.addLabelToCard(labelId, id),
      onLabelRemove: (labelId) => entryActions.removeLabelFromCard(labelId, id),
      onLabelCreate: (data) => entryActions.createLabelInCurrentBoard(data),
      onLabelUpdate: (labelId, data) => entryActions.updateLabel(labelId, data),
      onLabelMove: (labelId, index) => entryActions.moveLabel(labelId, index),
      onLabelDelete: (labelId) => entryActions.deleteLabel(labelId),
    },
    dispatch,
  );

export default connect(makeMapStateToProps, mapDispatchToProps)(Card);
