"use strict";

var ProjectList = function ProjectList(_ref) {
  var projects = _ref.projects;
  return React.createElement(
    "div",
    { className: "actual-content" },
    projects.map(function (project, index) {
      return React.createElement(ProjectEntry, { key: index, project: project });
    })
  );
};

ProjectList.propTypes = {
  projects: React.PropTypes.array.isRequired
};

window.ProjectList = ProjectList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9Qcm9qZWN0TGlzdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLGNBQWMsU0FBZCxXQUFjO01BQUU7U0FDcEI7O01BQUssV0FBVSxnQkFBVixFQUFMO0lBQ0ksU0FBUyxHQUFULENBQWMsVUFBQyxPQUFELEVBQVUsS0FBVjthQUNkLG9CQUFDLFlBQUQsSUFBYyxLQUFLLEtBQUwsRUFBWSxTQUFTLE9BQVQsRUFBMUI7S0FEYyxDQURsQjs7Q0FEa0I7O0FBU3BCLFlBQVksU0FBWixHQUF3QjtBQUN0QixZQUFVLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixVQUF0QjtDQURaOztBQUlBLE9BQU8sV0FBUCxHQUFxQixXQUFyQiIsImZpbGUiOiJQcm9qZWN0TGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFByb2plY3RMaXN0ID0gKHtwcm9qZWN0c30pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJhY3R1YWwtY29udGVudFwiPlxuICAgIHsgcHJvamVjdHMubWFwKCAocHJvamVjdCwgaW5kZXgpID0+IFxuICAgICAgPFByb2plY3RFbnRyeSBrZXk9e2luZGV4fSBwcm9qZWN0PXtwcm9qZWN0fSAvPlxuICAgICl9XG4gIDwvZGl2PlxuXG4pO1xuXG5Qcm9qZWN0TGlzdC5wcm9wVHlwZXMgPSB7XG4gIHByb2plY3RzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxufTtcblxud2luZG93LlByb2plY3RMaXN0ID0gUHJvamVjdExpc3Q7XG5cbiJdfQ==