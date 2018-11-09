const express = require('express')
const db = require('../../data/helpers/projectModel.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const projects = await db.get()
    if (projects) {
      res.status(200).json(projects)
    } else {
      res.status(404).json({ error: 'no projects found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'faild to retrieve projects' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const project = await db.get(id)
    if (project) {
      res.status(200).json(project)
    } else {
      res.status(404).json({ error: `project ${id} not found` })
    }
  } catch (error) {
    res.status(500).json({ error: 'faild to retrieve project' })
  }
})

router.get('/:id/actions', async (req, res) => {
  try {
    const actions = await db.getProjectActions(req.params.id)
    if (actions) {
      res.status(200).json(actions)
    } else {
      res.status(404).json({ error: 'no actions found for that project' })
    }
  } catch (error) {
    res.status(500).json({ error: 'db error' })
  }
})

router.post('/', async (req, res) => {
  const { name, description } = req.body

  if (!name || !description) {
    res
      .status(400)
      .json({ error: 'make sure you include name and description' })
  } else {
    try {
      const newProject = await db.insert(req.body)
      res.status(201).json(newProject)
    } catch (error) {
      res.status(500).json({
        error: 'failed to save project to db'
      })
    }
  }
})

router.put('/:id', async (req, res) => {
  const { name, description, completed } = req.body

  if (!db.get(req.params.id)) {
    res.status(404).json({ error: 'no project with that id' })
  } else if (!name && !description && !completed) {
    res.status(400).json({ error: 'no update information provided' })
  } else {
    try {
      const updatedProject = await db.update(req.params.id, req.body)
      res.status(200).json(updatedProject)
    } catch (error) {
      res.status(500).json({ error: 'failed to update project in db' })
    }
  }
})

router.delete('/:id', async (req, res) => {
  const project = await db.get(req.params.id)

  if (!project) {
    res.status(404).json({ error: 'project to delete not found' })
  } else {
    try {
      const count = await db.remove(req.params.id)
      if (count) {
        res.status(200).json(project)
      } else {
        res.status(400).json({ error: 'error deleting project' })
      }
    } catch (error) {
      res.status(500).json({ error: 'db error' })
    }
  }
})

module.exports = router
