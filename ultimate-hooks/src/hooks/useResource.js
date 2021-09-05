import { useEffect, useState } from 'react';
import customService from '../services/personService'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const resourceService = customService(baseUrl)

  useEffect(() => {
    resourceService.getAll()
      .then(resp => setResources(resp))
      .catch(err => setResources([]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const create = (resource) => {
    // ...
    resourceService.create(resource)
      .then(resp => {
        setResources(resource => resource.concat(resp))
      })
      .catch(() => {})
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}


export default useResource;