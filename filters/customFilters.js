angular.module('customFilters', [])
/**
 * filter
 * @name customFilters.filter:range
 * 
 * @description
 * this filter is used in paging search results to show a specific range of them based on the page size and selected page.
 * 
 * @dependencies
 * depends on the built in filter limitTo
 */
.filter("range", function ($filter) {
  return function (data, page, size) {
    if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {      
      var start_index = (page - 1) * size;
      if (data.length < start_index) {
        return [];
      } else {
        return $filter("limitTo")(data, size, start_index);
      }
    } else {
        return data;
    }
  }
})
/**
 * filter
 * @name customFilters.filter:pageCount
 * 
 * @description
 * this filter is used in paging by creating an array of pages based on the total search results and page size.
 * 
 */
.filter("pageCount", function () {
    return function (data, size) {
        if (angular.isArray(data)) {
            var result = [];
            for (var i = 0; i < Math.ceil(data.length / size) ; i++) {
                result.push(i);
            }
            return result;
        } else {
            return data;
        }
    }
});