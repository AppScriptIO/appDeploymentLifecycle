/**
 * Paths to module directories in the Docker container.
 */
module.exports = [
  // deploymentType is used for choosing the correct directory structure.
  {
    deploymentType: 'selfManaged',
    directory: {
      containerManagerRootFolder: "/project",
      managedApplicationRootFolder: '/project'
    }
  },
  {
    deploymentType: 'imageBuild',
    directory: {
      containerManagerRootFolder: "/project/appDeploymentEnvironment",
      managedApplicationRootFolder: '/project/appDeploymentEnvironment'      
    }      
  },
  {
    deploymentType: 'containerManager',
    directory: {
      containerManagerRootFolder: "/project/appDeploymentEnvironment",
      managedApplicationRootFolder: '/project'      
    }      
  }

]
