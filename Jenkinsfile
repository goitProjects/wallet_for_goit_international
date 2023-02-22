@Library('jenkins-common')_
 
node("nodejs"){
    stage('Load credentials') {
        withCredentials([
            string(credentialsId: 'goit_jenkins_build_bot_api_key', variable: 'telegramNotifyChannelBotApiToken'),
            string(credentialsId: 'goit_jenkins_build_chat_id', variable: 'telegramNotifyChannelChatId'),

            //add scp redential for https://wallet.goit.global
            string(credentialsId: 'ssh user_host_for_frontend_stud', variable: 'sshUserAndHost')
        ]) {
                env.telegramNotifyChannelBotApiToken = telegramNotifyChannelBotApiToken;
                env.telegramNotifyChannelChatId = telegramNotifyChannelChatId;
            
                env.sshUserAndHost = sshUserAndHost;

                env.projectFolder = 'wallet.goit.global/html';
        }
    }
    
    stage('Setup texts') {
        def buildUrl = env.RUN_DISPLAY_URL;
        
        env.startBuildText = java.net.URLEncoder.encode("Build *${JOB_NAME}* started\n[Go to build](${buildUrl})", "UTF-8");
        env.successBuildText = java.net.URLEncoder.encode("Build *${JOB_NAME}* finished SUCCESS.\nTime: TIME\n[Go to build](${buildUrl})", "UTF-8");
        env.failedBuildText = java.net.URLEncoder.encode("Build *${JOB_NAME}* FAILED.\nTime: TIME\n[Go to build](${buildUrl})", "UTF-8");
    }
    
    stage('Pre Build Notify') {
        //Send message to channel
        sendTelegramChannelMessage(
            env.telegramNotifyChannelBotApiToken,
            env.telegramNotifyChannelChatId,
            env.startBuildText
        );

    }
    
    stage('Clone Git Repo') {
        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
            git branch: 'master', credentialsId: 'github-goitProjects', url: 'git@github.com:goitProjects/wallet_for_goit_international.git'
        }
    }
    
        
    stage('Build'){
        def success = 'SUCCESS'.equals(currentBuild.currentResult);

        if (success) {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                sh "npm install && npm run build"
            }
        }
    }
    
    stage('Deploy') {
         def success = 'SUCCESS'.equals(currentBuild.currentResult);

        if (success) {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                //create folder for care-pets
                def mkdirCmd = "mkdir -p /home/frontend/sites/www/${env.projectFolder}"
                sh "ssh ${env.sshUserAndHost} ${mkdirCmd}"

                //sent files to https://wallet.goit.global
                sh "scp -r ./dist/* ${env.sshUserAndHost}:/home/frontend/sites/www/${env.projectFolder}"

                //clear project build folder
                sh "rm -rf .[!.]* *"
            }
        }
    }

    stage('Post Build Notify') {
        def success = 'SUCCESS'.equals(currentBuild.currentResult);
        def previousBuildSuccess = true;
        if (currentBuild.previousBuild != null && !'SUCCESS'.equals(currentBuild.previousBuild.currentResult)) {
            previousBuildSuccess = false;
        }
        
        def message = '';
        if (success) {
            message = env.successBuildText;
        } else {
            message = env.failedBuildText;
        }
        
        //Calculate time
        def durationSeconds = (int) (currentBuild.duration / 1000);
        def durationMinutes = (int) (durationSeconds / 60);
        durationSeconds -= durationMinutes * 60;
        
        message = message.replace('TIME', "${durationMinutes} min ${durationSeconds} sec");
        
        //Send message to global notify channel
        sendTelegramChannelMessage(
            env.telegramNotifyChannelBotApiToken,
            env.telegramNotifyChannelChatId,
            message
        )
        
    }
}