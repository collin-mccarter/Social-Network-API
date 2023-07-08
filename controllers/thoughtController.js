const Thought = require('../models/Thoughts');
const User = require('../models/Users');


module.exports = {
 getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'We are sorry we did not find that thought' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((steve) => res.json(steve))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id please try again!' })
          : res.json(thought)
      )
},
deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No thought found!' })
          : Thought.findOneAndUpdate(
              { users: req.params.thoughtId },
              { $pull: { users: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'Thought created but no user with this id!' })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
