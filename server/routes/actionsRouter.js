const express = require('express')
const db = require('../../data/helpers/actionModel.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const actions = await db.get()
    if (actions) {
      res.status(200).json(actions)
    } else {
      res.status(404).json({ error: 'no actions found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'faild to retrieve actions' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const action = await db.get(id)
    if (action) {
      res.status(200).json(action)
    } else {
      res.status(404).json({ error: `action ${id} not found` })
    }
  } catch (error) {
    res.status(500).json({ error: 'faild to retrieve action' })
  }
})

router.post('/', async (req, res) => {
  const { project_id, description, notes } = req.body

  if (!project_id || !description || !notes) {
    res.status(400).json({ error: 'missing data for action' })
  } else {
    try {
      const newActionId = await db.insert(req.body)
      const newAction = await db.get(newActionId)
      res.status(201).json(newAction)
    } catch (error) {
      res.status(500).json({
        error: 'failed to save action to db'
      })
    }
  }
})

router.put('/:id', async (req, res) => {
  const { project_id, description, notes, completed } = req.body

  if (!db.get(req.params.id)) {
    res.status(404).json({ error: 'no action with that id' })
  } else if (!project_id && !description && !notes && !completed) {
    res.status(400).json({ error: 'no data to upldate action provided' })
  } else {
    try {
      const count = await db.update(req.params.id, req.body)
      if (count) {
        const action = await db.get(req.params.id)
        res.status(200).json(action)
      } else {
        res.status(400).json({ error: 'failed to update action in db' })
      }
    } catch (error) {
      res.status(500).json({ error: 'db error' })
    }
  }
})

router.delete('/:id', async (req, res) => {
  const action = await db.get(req.params.id)

  if (!action) {
    res.status(404).json({ error: 'action to delete not found' })
  } else {
    try {
      const count = await db.remove(req.params.id)
      if (count) {
        res.status(200).json(action)
      } else {
        res.status(400).json({ error: 'error deleting action' })
      }
    } catch (error) {
      res.status(500).json({ error: 'db error' })
    }
  }
})

module.exports = router
