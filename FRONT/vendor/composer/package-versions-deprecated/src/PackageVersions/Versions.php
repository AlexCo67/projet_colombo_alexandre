<?php

declare(strict_types=1);

namespace PackageVersions;

use Composer\InstalledVersions;
use OutOfBoundsException;

class_exists(InstalledVersions::class);

/**
 * This class is generated by composer/package-versions-deprecated, specifically by
 * @see \PackageVersions\Installer
 *
 * This file is overwritten at every run of `composer install` or `composer update`.
 *
 * @deprecated in favor of the Composer\InstalledVersions class provided by Composer 2. Require composer-runtime-api:^2 to ensure it is present.
 */
final class Versions
{
    /**
     * @deprecated please use {@see self::rootPackageName()} instead.
     *             This constant will be removed in version 2.0.0.
     */
    const ROOT_PACKAGE_NAME = '__root__';

    /**
     * Array of all available composer packages.
     * Dont read this array from your calling code, but use the \PackageVersions\Versions::getVersion() method instead.
     *
     * @var array<string, string>
     * @internal
     */
    const VERSIONS          = array (
  'composer/package-versions-deprecated' => '1.11.99.5@b4f54f74ef3453349c24a845d22392cd31e65f1d',
  'doctrine/cache' => '1.12.1@4cf401d14df219fa6f38b671f5493449151c9ad8',
  'doctrine/collections' => '1.6.8@1958a744696c6bb3bb0d28db2611dc11610e78af',
  'doctrine/common' => '3.2.1@e927fc2410c8723d053b8032e591cdff76587cdb',
  'doctrine/dbal' => '3.2.1@4caf37acf14b513a91dd4f087f7eda424fa25542',
  'doctrine/deprecations' => 'v0.5.3@9504165960a1f83cc1480e2be1dd0a0478561314',
  'doctrine/event-manager' => '1.1.1@41370af6a30faa9dc0368c4a6814d596e81aba7f',
  'doctrine/inflector' => '2.0.4@8b7ff3e4b7de6b2c84da85637b59fd2880ecaa89',
  'doctrine/instantiator' => '1.4.0@d56bf6102915de5702778fe20f2de3b2fe570b5b',
  'doctrine/lexer' => '1.2.2@9c50f840f257bbb941e6f4a0e94ccf5db5c3f76c',
  'doctrine/orm' => '2.11.0@bfed8cb6ed448f4ab1ea3fff06e4d6c44439e4ef',
  'doctrine/persistence' => '2.3.0@f8af155c1e7963f3d2b4415097d55757bbaa53d8',
  'fig/http-message-util' => '1.1.5@9d94dc0154230ac39e5bf89398b324a86f63f765',
  'firebase/php-jwt' => 'v5.5.1@83b609028194aa042ea33b5af2d41a7427de80e6',
  'guzzlehttp/psr7' => '1.8.3@1afdd860a2566ed3c2b0b4a3de6e23434a79ec85',
  'http-interop/http-factory-guzzle' => '1.2.0@8f06e92b95405216b237521cc64c804dd44c4a81',
  'laminas/laminas-diactoros' => '2.8.0@0c26ef1d95b6d7e6e3943a243ba3dc0797227199',
  'neomerx/cors-psr7' => 'v1.0.13@2556e2013f16a55532c95928455257d5b6bbc6e2',
  'nikic/fast-route' => 'v1.3.0@181d480e08d9476e61381e04a71b34dc0432e812',
  'nyholm/psr7' => '1.4.1@2212385b47153ea71b1c1b1374f8cb5e4f7892ec',
  'nyholm/psr7-server' => '1.0.2@b846a689844cef114e8079d8c80f0afd96745ae3',
  'php-http/message-factory' => 'v1.0.2@a478cb11f66a6ac48d8954216cfed9aa06a501a1',
  'psr/cache' => '3.0.0@aa5030cfa5405eccfdcb1083ce040c2cb8d253bf',
  'psr/container' => '2.0.2@c71ecc56dfe541dbd90c5360474fbc405f8d5963',
  'psr/http-factory' => '1.0.1@12ac7fcd07e5b077433f5f2bee95b3a771bf61be',
  'psr/http-message' => '1.0.1@f6561bf28d520154e4b0ec72be95418abe6d9363',
  'psr/http-server-handler' => '1.0.1@aff2f80e33b7f026ec96bb42f63242dc50ffcae7',
  'psr/http-server-middleware' => '1.0.1@2296f45510945530b9dceb8bcedb5cb84d40c5f5',
  'psr/log' => '1.1.4@d49695b909c3b7628b6289db5479a1c204601f11',
  'ralouphie/getallheaders' => '3.0.3@120b605dfeb996808c31b6477290a714d356e822',
  'slim/psr7' => '1.5@a47b43a8da7c0208b4c228af0cb29ea36080635a',
  'slim/slim' => '4.9.0@44d3c9c0bfcc47e52e42b097b6062689d21b904b',
  'symfony/console' => 'v6.0.2@dd434fa8d69325e5d210f63070014d889511fcb3',
  'symfony/polyfill-ctype' => 'v1.24.0@30885182c981ab175d4d034db0f6f469898070ab',
  'symfony/polyfill-intl-grapheme' => 'v1.24.0@81b86b50cf841a64252b439e738e97f4a34e2783',
  'symfony/polyfill-intl-normalizer' => 'v1.24.0@8590a5f561694770bdcd3f9b5c69dde6945028e8',
  'symfony/polyfill-mbstring' => 'v1.24.0@0abb51d2f102e00a4eefcf46ba7fec406d245825',
  'symfony/polyfill-php72' => 'v1.24.0@9a142215a36a3888e30d0a9eeea9766764e96976',
  'symfony/polyfill-php80' => 'v1.24.0@57b712b08eddb97c762a8caa32c84e037892d2e9',
  'symfony/service-contracts' => 'v3.0.0@36715ebf9fb9db73db0cb24263c79077c6fe8603',
  'symfony/string' => 'v6.0.2@bae261d0c3ac38a1f802b4dfed42094296100631',
  'symfony/yaml' => 'v2.8.52@02c1859112aa779d9ab394ae4f3381911d84052b',
  'tuupola/callable-handler' => '1.1.0@0bc7b88630ca753de9aba8f411046856f5ca6f8c',
  'tuupola/cors-middleware' => '1.2.1@4f085d11f349e83d18f1eb5802551353b2b093a3',
  'tuupola/http-factory' => '1.4.0@ae3f8fbdd31cf2f1bbe920b38963c5e4d1e9c454',
  'tuupola/slim-jwt-auth' => '3.6.0@d9ed8bca77a0ef2a95ab48e65ddc26073b99c5ff',
  '__root__' => 'dev-master@9afe17fb7709b3828bdcb386670982b46ddf5c26',
);

    private function __construct()
    {
    }

    /**
     * @psalm-pure
     *
     * @psalm-suppress ImpureMethodCall we know that {@see InstalledVersions} interaction does not
     *                                  cause any side effects here.
     */
    public static function rootPackageName() : string
    {
        if (!self::composer2ApiUsable()) {
            return self::ROOT_PACKAGE_NAME;
        }

        return InstalledVersions::getRootPackage()['name'];
    }

    /**
     * @throws OutOfBoundsException If a version cannot be located.
     *
     * @psalm-param key-of<self::VERSIONS> $packageName
     * @psalm-pure
     *
     * @psalm-suppress ImpureMethodCall we know that {@see InstalledVersions} interaction does not
     *                                  cause any side effects here.
     */
    public static function getVersion(string $packageName): string
    {
        if (self::composer2ApiUsable()) {
            return InstalledVersions::getPrettyVersion($packageName)
                . '@' . InstalledVersions::getReference($packageName);
        }

        if (isset(self::VERSIONS[$packageName])) {
            return self::VERSIONS[$packageName];
        }

        throw new OutOfBoundsException(
            'Required package "' . $packageName . '" is not installed: check your ./vendor/composer/installed.json and/or ./composer.lock files'
        );
    }

    private static function composer2ApiUsable(): bool
    {
        if (!class_exists(InstalledVersions::class, false)) {
            return false;
        }

        if (method_exists(InstalledVersions::class, 'getAllRawData')) {
            $rawData = InstalledVersions::getAllRawData();
            if (count($rawData) === 1 && count($rawData[0]) === 0) {
                return false;
            }
        } else {
            $rawData = InstalledVersions::getRawData();
            if ($rawData === null || $rawData === []) {
                return false;
            }
        }

        return true;
    }
}
