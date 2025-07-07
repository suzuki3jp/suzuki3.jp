"use client";

import { useEffect, useState } from "react";

export function useTypingAnimation(
	texts: string[],
	pauseDuration = 2000,
	typingSpeed = 100,
	deletingSpeed = 50,
) {
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [currentText, setCurrentText] = useState("");
	const [isTyping, setIsTyping] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const targetText = texts[currentTextIndex];

		if (isTyping && !isDeleting) {
			// タイピング中
			if (currentText.length < targetText.length) {
				const timeout = setTimeout(() => {
					setCurrentText(targetText.slice(0, currentText.length + 1));
				}, typingSpeed);
				return () => clearTimeout(timeout);
			} else {
				// タイピング完了、一時停止後に削除開始
				const timeout = setTimeout(() => {
					setIsDeleting(true);
					setIsTyping(false);
				}, pauseDuration);
				return () => clearTimeout(timeout);
			}
		} else if (isDeleting && !isTyping) {
			// 削除中
			if (currentText.length > 0) {
				const timeout = setTimeout(() => {
					setCurrentText(currentText.slice(0, -1));
				}, deletingSpeed);
				return () => clearTimeout(timeout);
			} else {
				// 削除完了、次のテキストへ
				setCurrentTextIndex((prev) => (prev + 1) % texts.length);
				setIsDeleting(false);
				setIsTyping(true);
			}
		}
	}, [
		currentText,
		currentTextIndex,
		isTyping,
		isDeleting,
		texts,
		pauseDuration,
		typingSpeed,
		deletingSpeed,
	]);

	return currentText;
}
