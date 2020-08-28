package com.raghu.training.jenkins;

import static org.testng.Assert.*;

import org.testng.annotations.Test;

public class JenkinsCalcTest {

	@Test
	public void addNumbers() {
		JenkinsCalc calc = new JenkinsCalc();
		assertEquals(10, calc.addNumbers(5, 5));
	}

	@Test
	public void subNumbers() {
		JenkinsCalc calc = new JenkinsCalc();
		assertEquals(10, calc.subNumbers(15, 5));
	}

}
