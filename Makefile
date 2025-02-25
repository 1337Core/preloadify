.PHONY: store 

store:
	@echo "Packaging zip..."
	@zip preloadify.zip * -r
	@echo "Build completed."

clean:
	@echo "Started cleaning...."
	@rm preloadify.zip 
	@echo "Finished cleaning"
