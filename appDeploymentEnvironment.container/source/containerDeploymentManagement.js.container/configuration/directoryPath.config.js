/**
 * Paths to module directories in the Docker container.
 */
module.exports = [
  {
    deploymentType: 'containerManagement',
    directory: {
      projectContainerRootFolder: "/project"
    }
  },
  {
    deploymentType: 'imageBuild',
    directory: {
      projectContainerRootFolder: "/project/appDeploymentEnvironment"    
    }      
  }

]
