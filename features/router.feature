Feature: Multicast
  As a developer
  I want to be able route exchanges to different outputs based on their content
  So that I keep routing and processing logic separate

  Scenario: Message should be sent to choice A
    Given a route "choice" which routes content based on the expressions:
      | when                 | append text |
      | message.body === "A" | -choiceA    |
      | message.body === "B" | -choiceB    |
    When I send an exchange to the "choice" route with the body "A"
    Then output A receives the message

