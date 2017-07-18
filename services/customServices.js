angular.module('customServices', ['ngResource'])
.constant("serviceBaseUrl", "https://itunes.apple.com/")
/**
 * factory
 * @name customServices.factory:musicResource
 * 
 * @description
 * this factory provides access to both search and lookup facilities of iTunes API
 * 
 * @dependencies
 * depends on $resource service to work with RESTful API's
 */
.factory('musicResource', function($resource, serviceBaseUrl) {
  return $resource(serviceBaseUrl + ':queryType?:queryCriterion=:query&',
  {queryType: '@queryType', queryCriterion: '@queryCriterion', query: '@query'}, {
    query: {
      method: 'JSONP',
      params: {
        term: '@query',
        media: '@media',
        entity: '@entity',
        attribute: '@attribute',
        callback: 'JSON_CALLBACK'
      }
    }
  });
});