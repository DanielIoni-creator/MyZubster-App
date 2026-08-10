package com.myzubster.security

import android.content.Context
import android.os.Build
import java.io.File

/**
 * RootDetector - Rilevazione di dispositivi rootati/compromessi
 */
class RootDetector(private val context: Context) {

    companion object {
        private val ROOT_PATHS = arrayOf(
            "/system/app/Superuser.apk",
            "/sbin/su",
            "/system/bin/su",
            "/system/xbin/su",
            "/data/local/xbin/su",
            "/data/local/bin/su",
            "/system/sd/xbin/su",
            "/system/bin/failsafe/su",
            "/data/local/su",
            "/su/bin/su"
        )

        private val ROOT_PACKAGES = arrayOf(
            "com.noshufou.android.su",
            "com.thirdparty.superuser",
            "eu.chainfire.supersu",
            "com.koushikdutta.superuser",
            "com.zachspong.temprootremovejb",
            "com.ramdroid.appquarantine"
        )
    }

    /**
     * Verifica se il dispositivo è rootato
     */
    fun isDeviceRooted(): Boolean {
        return checkRootPaths() || checkRootPackages() || checkBuildTags()
    }

    /**
     * Controlla la presenza di file root
     */
    private fun checkRootPaths(): Boolean {
        return ROOT_PATHS.any { File(it).exists() }
    }

    /**
     * Controlla la presenza di app root
     */
    private fun checkRootPackages(): Boolean {
        val packageManager = context.packageManager
        return ROOT_PACKAGES.any { 
            try {
                packageManager.getPackageInfo(it, 0)
                true
            } catch (e: Exception) {
                false
            }
        }
    }

    /**
     * Controlla i build tags
     */
    private fun checkBuildTags(): Boolean {
        return Build.TAGS?.contains("test-keys") == true
    }

    /**
     * Restituisce un messaggio di sicurezza
     */
    fun getSecurityMessage(): String {
        return when {
            isDeviceRooted() -> "⚠️ Dispositivo rootato rilevato. Per la sicurezza, alcune funzionalità potrebbero essere limitate."
            else -> "✅ Dispositivo sicuro."
        }
    }
}
