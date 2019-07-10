Feature: Posting a Job
    In order to post a job
    As a startup
    I want to be able to post a job

    Scenario Outline: Entering data into the form
    Given I am at the job posting form page
    When I enter values
    Then I should see those values added

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |

    Scenario Outline: Submit form when it is not filled out
    Given I am at the job posting form page
    When I submit before everything is filled out
    Then the submit should fail

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |

    Scenario Outline: Submit filled out form
    Given I am at the job posting form page
    When I submit the filled out form
    Then the submit should succeed

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |
