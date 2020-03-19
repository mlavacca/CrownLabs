/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.13.10
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { V1beta1CustomResourceSubresourceScale } from './v1beta1CustomResourceSubresourceScale';

/**
* CustomResourceSubresources defines the status and scale subresources for CustomResources.
*/
export class V1beta1CustomResourceSubresources {
    'scale'?: V1beta1CustomResourceSubresourceScale;
    /**
    * Status denotes the status subresource for CustomResources
    */
    'status'?: object;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "scale",
            "baseName": "scale",
            "type": "V1beta1CustomResourceSubresourceScale"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "object"
        }    ];

    static getAttributeTypeMap() {
        return V1beta1CustomResourceSubresources.attributeTypeMap;
    }
}
