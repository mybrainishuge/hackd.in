"use strict";

define(["./core", "./selector", "./traversing", "./callbacks", "./deferred", "./core/ready", "./data", "./queue", "./queue/delay", "./attributes", "./event", "./event/alias", "./event/focusin", "./manipulation", "./manipulation/_evalUrl", "./wrap", "./css", "./css/hiddenVisibleSelectors", "./serialize", "./ajax", "./ajax/xhr", "./ajax/script", "./ajax/jsonp", "./ajax/load", "./event/ajax", "./effects", "./effects/animatedSelector", "./offset", "./dimensions", "./deprecated", "./exports/amd"], function (jQuery) {

	return window.jQuery = window.$ = jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvanF1ZXJ5L3NyYy9qcXVlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFRLENBQ1AsUUFETyxFQUVQLFlBRk8sRUFHUCxjQUhPLEVBSVAsYUFKTyxFQUtQLFlBTE8sRUFNUCxjQU5PLEVBT1AsUUFQTyxFQVFQLFNBUk8sRUFTUCxlQVRPLEVBVVAsY0FWTyxFQVdQLFNBWE8sRUFZUCxlQVpPLEVBYVAsaUJBYk8sRUFjUCxnQkFkTyxFQWVQLHlCQWZPLEVBZ0JQLFFBaEJPLEVBaUJQLE9BakJPLEVBa0JQLDhCQWxCTyxFQW1CUCxhQW5CTyxFQW9CUCxRQXBCTyxFQXFCUCxZQXJCTyxFQXNCUCxlQXRCTyxFQXVCUCxjQXZCTyxFQXdCUCxhQXhCTyxFQXlCUCxjQXpCTyxFQTBCUCxXQTFCTyxFQTJCUCw0QkEzQk8sRUE0QlAsVUE1Qk8sRUE2QlAsY0E3Qk8sRUE4QlAsY0E5Qk8sRUErQlAsZUEvQk8sQ0FBUixFQWdDRyxVQUFVLE1BQVYsRUFBbUI7O0FBRXRCLFFBQVMsT0FBTyxNQUFQLEdBQWdCLE9BQU8sQ0FBUCxHQUFXLE1BQVgsQ0FGSDtDQUFuQixDQWhDSCIsImZpbGUiOiJqcXVlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuL2NvcmVcIixcblx0XCIuL3NlbGVjdG9yXCIsXG5cdFwiLi90cmF2ZXJzaW5nXCIsXG5cdFwiLi9jYWxsYmFja3NcIixcblx0XCIuL2RlZmVycmVkXCIsXG5cdFwiLi9jb3JlL3JlYWR5XCIsXG5cdFwiLi9kYXRhXCIsXG5cdFwiLi9xdWV1ZVwiLFxuXHRcIi4vcXVldWUvZGVsYXlcIixcblx0XCIuL2F0dHJpYnV0ZXNcIixcblx0XCIuL2V2ZW50XCIsXG5cdFwiLi9ldmVudC9hbGlhc1wiLFxuXHRcIi4vZXZlbnQvZm9jdXNpblwiLFxuXHRcIi4vbWFuaXB1bGF0aW9uXCIsXG5cdFwiLi9tYW5pcHVsYXRpb24vX2V2YWxVcmxcIixcblx0XCIuL3dyYXBcIixcblx0XCIuL2Nzc1wiLFxuXHRcIi4vY3NzL2hpZGRlblZpc2libGVTZWxlY3RvcnNcIixcblx0XCIuL3NlcmlhbGl6ZVwiLFxuXHRcIi4vYWpheFwiLFxuXHRcIi4vYWpheC94aHJcIixcblx0XCIuL2FqYXgvc2NyaXB0XCIsXG5cdFwiLi9hamF4L2pzb25wXCIsXG5cdFwiLi9hamF4L2xvYWRcIixcblx0XCIuL2V2ZW50L2FqYXhcIixcblx0XCIuL2VmZmVjdHNcIixcblx0XCIuL2VmZmVjdHMvYW5pbWF0ZWRTZWxlY3RvclwiLFxuXHRcIi4vb2Zmc2V0XCIsXG5cdFwiLi9kaW1lbnNpb25zXCIsXG5cdFwiLi9kZXByZWNhdGVkXCIsXG5cdFwiLi9leHBvcnRzL2FtZFwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5ICkge1xuXG5yZXR1cm4gKCB3aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSBqUXVlcnkgKTtcblxufSApO1xuIl19