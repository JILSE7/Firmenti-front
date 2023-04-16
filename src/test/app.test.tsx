import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import App from '../App'


describe('test in app', () => { 
  test('should first', async() => { 
     render(<App />)
      const button = await screen.findByRole('button')
      expect(button.innerHTML).toBe("count is 0")
     // screen.debug()
  })
})