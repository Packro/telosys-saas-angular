package org.telosys.saas.servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.telosys.saas.config.Configuration;
import org.telosys.saas.config.ConfigurationHolder;
import org.telosys.tools.users.UsersManager;

/**
 * Application initialization.
 */
public class InitServletContextListener implements ServletContextListener {

    protected static final Logger logger = LoggerFactory.getLogger(InitServletContextListener.class);

    /**
     * Initialization
     */
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        logger.info("Initialization");
        logger.info("Loading configuration...");
        Configuration configuration = ConfigurationHolder.getConfiguration();
        if (configuration != null) {
            logger.info("Configuration loaded");
            logger.info(" . data root path  = " + configuration.getDataRootPath());
            logger.info(" . users file path = " + configuration.getUsersFilePath());
            logger.info(" . Github OAuth Key = " + configuration.getGithubOauthKey());
            logger.info(" . Mail Username = " + configuration.getMailUsername());
            logger.info(" . Mail redirect = " + configuration.getMailRedirect());
            logger.info(" . Login Attempts Max = " + configuration.getLoginAttemptsMax());
            logger.info(" . Number of project Max = " + configuration.getNumberOfProjectMax());
            UsersManager.setUsersFileName(configuration.getUsersFilePath());
            logger.info("UsersManager initializedIDE.");
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }

}
