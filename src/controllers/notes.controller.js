const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
  console.log('lalas')
  const { title, description} = req.body;
  const newNote = new Note({ title, description});
  newNote.user = req.user.id;
  await newNote.save();
  req.flash('success_msg', 'Note Added Succesfully');
  res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({user: req.user.id}).lean();
  res.render('notes/all-notes', { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id){
    req.flash('error_msg', 'Not authorized')
    return res.redirect('/notes');
  }
  console.log(note);
  console.log('lala')
  res.render('notes/edit-note', { note });
};

notesCtrl.updateNotes = async (req, res) => {
  const {title, description} = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description})
  req.flash('succes_msg', 'Note Updated Succesfully')
  res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note Deleted Succesfully');
  res.redirect('/notes');
};

module.exports = notesCtrl;
