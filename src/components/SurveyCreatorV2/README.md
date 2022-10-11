# Simple Survey Creator V2

The application can be ran with `npm start`.

## Design V2

[Figma](https://www.figma.com/file/sJs4usXpyZa9lKauY5NKT0/Enveritas---Survey-Creator?node-id=842%3A9382)

Idea behind the design was to use the white space efficiently as possible, but not to not add too much visual clutter. The initial thought was to have the folders themselves expand on the main middle column (similar to reddit/forum comment threads). But after some ideation, I thought it would become unnecessarily cluttered when there are deeply nested folders and difficult to drag/drop items. So to separate out the concerns, we could have the survey folder directory accessable in the left hand nav. And then for deep item transfer, it would make sense to have a modal view of the selected folders. With that, it would still allow for the center of attention to stay in the middle column, while having highly effective functionality.

## Implementation summary

In an actual production application, I would have stripped out the current formik architecture (singular monolith form), and broken it down to smaller forms (for each create/edit folder/question/title card). And have a state management system or react-query to cache the survey data. But due to time constraints, I have decided to make quick adjustments to the current structure.

The following is what I was able to implement:

- Create/delete folders from the root level
- Drag and drop of questions and folders to a folder from root level
- Survey explorer of the folder structure that is collapsable/expandable
- Floating menu to create questions and folders, and save the form to `localStorage`

Todos:

- Make a generic reusable `ItemCard` component where `FolderCard` and `QuestionCard` can branch off of.
- Fix broken tests and add coverage to new functionality.
- Add floating menu to title card
- Fix folder/question counter bug
- Re-ordering questions and folders in survey explorer
- Access folder view from survey explorer
- Access folder view from access button (from folder)
- Breadcrumbs on folder view
- Search survey for questions and folders
- Delete folder modal
- Questions and folders transfer modal
- Toast notifications for folder delete, transfer, save.
