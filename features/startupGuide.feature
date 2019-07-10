Feature: Learning about the Startup process
    In order to learn about the startup process
    As a student
    I want to learn the process step by step

    Scenario Outline: Using the startup roadmap
    Given I am at the roadmap page
    When I click the next button <nextClicks> times and the back button <backClicks> times
    Then I should be on the target step

    Examples:
        | nextClicks | backClicks |
        |      1     |      1     |
