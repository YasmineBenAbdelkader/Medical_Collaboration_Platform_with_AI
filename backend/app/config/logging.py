# import logging
import logging.config

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {"format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"},
    },
    "handlers": {
        "default": {
            "level": "DEBUG",
            "formatter": "standard",
            "class": "logging.StreamHandler",
        },
    },
    "loggers": {
        "": {"handlers": ["default"], "level": "INFO", "propagate": True},
        "app": {"handlers": ["default"], "level": "DEBUG", "propagate": False},
    },
}


def setup_loggers():
    logging.config.dictConfig(LOGGING_CONFIG)
    logging.getLogger("app").info("✅ Logging configuré avec succès")
