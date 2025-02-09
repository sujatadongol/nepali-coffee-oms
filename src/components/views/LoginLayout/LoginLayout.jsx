import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import localDb from "../../../global/localStorage";
import StyledButton from "../../elements/Button";

// Styled-components
const FormWrapper = styled.div`
  display: grid;
  gap: 1.5rem; /* Tailwind's gap-6 */
`;

const StyledForm = styled.form`
  display: grid;
  gap: 1rem; /* Tailwind's gap-4 */
`;

const InputGroup = styled.div`
  display: grid;
  gap: 0.25rem; /* Tailwind's gap-1 */
`;

const StyledLabel = styled.label`
  font-size: 0.875rem; /* Tailwind's text-sm */
  font-weight: 500;
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.75rem; /* Tailwind's px-3 py-2 */
  border: 1px solid #d1d5db; /* Tailwind's border-gray-300 */
  border-radius: 0.375rem; /* Tailwind's rounded-md */
  font-size: 1rem; /* Tailwind's text-base */
  &:disabled {
    background-color: #f9fafb; /* Tailwind's bg-gray-100 */
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Tailwind's space-x-2 */
`;

const StyledCheckboxLabel = styled.label`
  font-size: 0.875rem; /* Tailwind's text-sm */
  font-weight: 500;
  cursor: pointer;
  opacity: 1;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled.div`
  font-size: 0.875rem; /* Tailwind's text-sm */
  color: #2563eb; /* Tailwind's text-blue-600 */
  &:hover {
    text-decoration: underline;
  }
`;

export default function LoginLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <FormWrapper>
      <StyledForm onSubmit={onSubmit}>
        <InputGroup>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
        </InputGroup>
        <InputGroup>
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <StyledInput
            id="password"
            placeholder="••••••••"
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            disabled={isLoading}
          />
        </InputGroup>
        <CheckboxGroup>
          <input id="remember" type="checkbox" />
          <StyledCheckboxLabel
            htmlFor="remember"
            className={isLoading ? "disabled" : ""}>
            Remember me
          </StyledCheckboxLabel>
        </CheckboxGroup>

        <StyledButton
          styleObj={{ height: "40px", width: "100px", radius: "20px" }}
          buttonName="Sign In"
          onClick={() => {
            navigate("/");
            localDb.setSessions({ abc: 123 });
          }}
        />
      </StyledForm>
      <StyledLinks>
        <StyledLink href="/register">Create an account</StyledLink>
        <StyledLink href="/forgot-password">Forgot password?</StyledLink>
      </StyledLinks>
    </FormWrapper>
  );
}
