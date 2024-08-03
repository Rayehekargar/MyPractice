// __tests__/LoanForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import LoanForm from '../../../../app/ui/loans/loanForm';
import 'cross-fetch/polyfill'

describe('LoanForm Component', () => {
  it('renders the LoanForm component correctly', () => {
    render(<LoanForm />);
    
    // تست وجود تیتر فرم
    const titleElement = screen.getByText('فرم ثبت و انتخاب تسهیلات');
    expect(titleElement).toBeInTheDocument();

    // بررسی وجود دکمه مرحله بعد
    const nextButton = screen.getByRole('button', { name: /مرحله بعد/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('disables the next step button when form is invalid', () => {
    render(<LoanForm />);

    // دکمه مرحله بعد باید غیرفعال باشد چون فرم خالی است
    const nextButton = screen.getByRole('button', { name: /مرحله بعد/i });
    expect(nextButton).toBeDisabled();
  });


});
