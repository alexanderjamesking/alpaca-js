Feature: Request
  As an Alpaca developer
  I want routes that return a response
  So that I can create a workflow within my app

  Scenario: A simple 'Hello World' route
    Given a "helloWorld" route that appends " World!" to a message
    When I send an exchange to "helloWorld" with the message "Hello"
    Then I get a message back containing "Hello World!"

  Scenario: Request propagates through nested routes
    Given a "waveGoodbye" route that appends "Wave Goodbye" to a message
    And a "sayHello" route which appends "Say Hello, " then calls the "waveGoodbye" route
    When I send an exchange to the "sayHello" route
    Then I get a message back containing "Say Hello, Wave Goodbye"