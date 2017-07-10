pipeline
{
    parameters
    {
        string(name: 'BRANCH', defaultValue: 'master', description: 'Choose git branch to build from')
    }
    options
    {
        buildDiscarder(logRotator(numToKeepStr: '30', daysToKeepStr: '60'))
    }
    agent
    {
        docker
        {
            image '329054710135.dkr.ecr.eu-west-2.amazonaws.com/k8s-fuze:1'
        }
    }
    stages
    {
        stage('SCM: code update')
        {
            steps
            {
                script
                {
                     currentBuild.displayName = "#${BUILD_ID}-${BRANCH}"
                }
                checkout([
                    $class: 'GitSCM', branches: [[name: '${BRANCH}']],
                    userRemoteConfigs: [[url: 'git@github.com:tikalk/RM_AuthorServer.git',credentialsId:'ubuntu']]
                ])
            }
        }
        stage('Docker Build')
        {
            steps
            {
                sh("docker build -t rm_authorservice .")
            }
        }
        stage('Docker Push')
        {
            steps
            {
                sh("docker push 329054710135.dkr.ecr.eu-central-1.amazonaws.com/rm_authorservice:latest")
            }
        }
    }
    post
    {
        success
        {
            notifyBuild('SUCCESS')
        }

        failure
        {
            notifyBuild('FAILURE')
        }

        unstable
        {
            notifyBuild('UNSTABLE')
        }
    }
}

def notifyBuild(String buildStatus = 'STARTED')
{
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESS'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"
  def notify = false

  // Override default values based on build status
  if (buildStatus == 'STARTED')
  {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  }
  else if (buildStatus == 'SUCCESS')
  {
    color = 'GREEN' 
    colorCode = '#00CF00'
    notify = true
  }
  else
  {
    color = 'RED'
    colorCode = '#FF0000'
    notify = true
  }

  // Send notifications
  if (notify == true)
  {
    slackSend (color: colorCode, message: summary, channel: "#fuse2017-player" )
  }
}